import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: string;
  farmer: string;
  image: string;
  category: string;
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  }, []);

  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Order placed!",
      description: "Thank you for your purchase. The farmer will contact you soon.",
    });
    // Clear cart after checkout
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div className="min-h-screen bg-market-cream">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-32">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-market-brown font-new-roman">Your Cart</h1>
          <p className="text-market-brown/70 mt-2">Review your items and checkout</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center text-market-brown/70 py-8">
            Your cart is empty
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <Card key={item.id} className="mb-4">
                  <CardContent className="flex items-center p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="font-new-roman text-market-brown">{item.name}</h3>
                      <p className="text-market-brown/70 text-sm">{item.farmer}</p>
                      <div className="flex items-center gap-1 text-market-orange">
                        <DollarSign className="w-4 h-4" />
                        {item.price}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="font-new-roman text-market-brown">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-market-brown">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <hr className="border-market-brown/20" />
                    <div className="flex justify-between font-bold text-market-brown">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full mt-4"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;