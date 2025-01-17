import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { CategoryCard } from '@/components/CategoryCard';
import { FarmerCard } from '@/components/FarmerCard';
import { LeafyGreen, ShoppingBasket, MapPin } from 'lucide-react';

const categories = [
  {
    title: "Fresh Produce",
    icon: LeafyGreen,
    description: "Locally grown fruits and vegetables"
  },
  {
    title: "Market Items",
    icon: ShoppingBasket,
    description: "Artisanal goods and products"
  },
  {
    title: "Local Vendors",
    icon: MapPin,
    description: "Meet your local farmers"
  }
];

const farmers = [
  {
    name: "Green Acres Farm",
    image: "/placeholder.svg",
    specialty: "Organic Vegetables"
  },
  {
    name: "Sunny Valley Fruits",
    image: "/placeholder.svg",
    specialty: "Fresh Fruits"
  },
  {
    name: "Heritage Farm",
    image: "/placeholder.svg",
    specialty: "Artisanal Cheese"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-market-cream">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-market-orange text-sm font-medium bg-market-orange/10 px-4 py-1 rounded-full"
            >
              Welcome to your local market
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-market-brown mt-4"
            >
              Fresh from the Farm
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-market-brown/70 mt-2"
            >
              Discover local produce and artisanal goods
            </motion.p>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-market-brown mb-6">Categories</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-market-brown mb-6">Featured Farmers</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {farmers.map((farmer) => (
              <FarmerCard key={farmer.name} {...farmer} />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Index;