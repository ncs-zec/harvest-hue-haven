import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryCard } from '@/components/CategoryCard';
import { FarmerCard } from '@/components/FarmerCard';
import { Beef, Milk, Carrot, Apple, MapPin, Egg } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: "Meat",
    icon: Beef,
    description: "Fresh local meats and poultry"
  },
  {
    title: "Dairy",
    icon: Milk,
    description: "Fresh milk, cheese, and dairy products"
  },
  {
    title: "Vegetables",
    icon: Carrot,
    description: "Locally grown seasonal vegetables"
  },
  {
    title: "Fruit",
    icon: Apple,
    description: "Fresh seasonal fruits"
  },
  {
    title: "Eggs",
    icon: Egg,
    description: "Farm fresh eggs"
  }
];

const recentlyVisitedFarms = [
  {
    name: "Green Acres Farm",
    image: "/placeholder.svg",
    specialty: "Organic Vegetables",
    visitedAt: new Date(2024, 3, 15, 14, 30)
  },
  {
    name: "Sunny Valley Fruits",
    image: "/placeholder.svg",
    specialty: "Fresh Fruits",
    visitedAt: new Date(2024, 3, 14, 16, 45)
  },
  {
    name: "Heritage Farm",
    image: "/placeholder.svg",
    specialty: "Artisanal Cheese",
    visitedAt: new Date(2024, 3, 13, 11, 20)
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-bold text-market-black mb-4"
            >
              Fresh from Your Local Farms
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Connect directly with local farmers for the freshest produce and support your community
            </motion.p>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-market-black mb-6">Categories</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-market-black mb-6">Recently Visited Farms</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentlyVisitedFarms.map((farmer) => (
              <FarmerCard key={farmer.name} {...farmer} />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Link to="/location">
            <div className="bg-market-cream p-8 rounded-2xl hover:bg-opacity-80 transition-all cursor-pointer">
              <div className="flex items-center justify-center gap-4 mb-4">
                <MapPin className="w-6 h-6 text-market-orange" />
                <h2 className="text-2xl font-bold text-market-black">Find Nearby Farms</h2>
              </div>
              <p className="text-gray-600">Discover local farms in your area using our interactive map</p>
            </div>
          </Link>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;