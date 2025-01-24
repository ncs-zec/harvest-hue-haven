import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // This would typically come from an API call using the id
  const product = {
    id: 1,
    name: "Fresh Organic Tomatoes",
    price: "4.99",
    farmer: "Green Acres Farm",
    image: "/placeholder.svg",
    category: "Vegetables",
    description: "Hand-picked, vine-ripened tomatoes grown without synthetic pesticides. Our tomatoes are harvested at peak ripeness for maximum flavor and nutrition.",
    farmingPractices: [
      "No synthetic pesticides",
      "Sustainable irrigation",
      "Crop rotation",
      "Natural pest management"
    ],
    seasonality: "Peak season: July through October",
    storageGuide: "Store at room temperature away from direct sunlight. Use within 5-7 days for best quality."
  };

  const handleCallFarmer = () => {
    toast({
      title: "Connecting with Farmer",
      description: `Initiating call with ${product.farmer}...`,
    });
  };

  return (
    <div className="min-h-screen bg-market-cream">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square relative">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-market-brown font-new-roman">{product.name}</h1>
              <p className="text-market-orange text-xl font-semibold mt-2">${product.price}</p>
              <p className="text-market-brown/70 mt-1">{product.farmer}</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-market-brown">{product.description}</p>
              
              <div>
                <h3 className="font-semibold text-market-brown mb-2">Farming Practices</h3>
                <ul className="list-disc pl-5 text-market-brown/70 space-y-1">
                  {product.farmingPractices.map((practice) => (
                    <li key={practice}>{practice}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-market-brown">Seasonality</h3>
                <p className="text-market-brown/70">{product.seasonality}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-market-brown">Storage Guide</h3>
                <p className="text-market-brown/70">{product.storageGuide}</p>
              </div>
            </div>
            
            <Button 
              onClick={handleCallFarmer}
              className="w-full bg-market-orange hover:bg-market-orange/90 text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Farmer
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;