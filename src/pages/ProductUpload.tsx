import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, DollarSign, Tag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProductUpload = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the upload to a backend
    toast({
      title: "Product uploaded successfully!",
      description: "Your product is now visible in the marketplace.",
    });
  };

  return (
    <div className="min-h-screen bg-market-cream">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-market-brown font-new-roman">Upload Your Product</h1>
            <p className="text-market-brown/70 mt-2">Share your farm's products with the community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-2">
              <label className="text-sm font-medium text-market-brown">Product Name</label>
              <Input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="border-market-brown/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-market-brown">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product"
                className="border-market-brown/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-market-brown">Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-market-brown/50" />
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="pl-10 border-market-brown/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-market-brown">Category</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-market-brown/50" />
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Vegetables"
                    className="pl-10 border-market-brown/20"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-market-brown">Product Image</label>
              <div className="border-2 border-dashed border-market-brown/20 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="w-8 h-8 text-market-brown/50" />
                  <span className="text-sm text-market-brown/70">
                    Click to upload an image
                  </span>
                  {image && (
                    <span className="text-xs text-market-orange">{image.name}</span>
                  )}
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-market-orange hover:bg-market-orange/90"
            >
              Upload Product
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductUpload;