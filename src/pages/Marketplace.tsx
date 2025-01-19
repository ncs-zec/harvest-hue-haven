import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

// This would typically come from your backend
const products = [
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    price: "4.99",
    farmer: "Green Acres Farm",
    image: "/placeholder.svg",
    category: "Vegetables"
  },
  {
    id: 2,
    name: "Farm Fresh Eggs",
    price: "6.99",
    farmer: "Sunny Valley Farm",
    image: "/placeholder.svg",
    category: "Dairy"
  },
  {
    id: 3,
    name: "Grass-Fed Beef",
    price: "15.99",
    farmer: "Heritage Farm",
    image: "/placeholder.svg",
    category: "Meat"
  }
];

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-market-cream">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-32">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-market-brown font-new-roman">Marketplace</h1>
          <p className="text-market-brown/70 mt-2">Discover local farm products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-new-roman text-market-brown">
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-market-brown/70 text-sm">{product.farmer}</span>
                  <div className="flex items-center gap-1 text-market-orange font-semibold">
                    <DollarSign className="w-4 h-4" />
                    {product.price}
                  </div>
                </div>
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 rounded-full bg-market-orange/10 text-market-orange text-xs">
                    {product.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;