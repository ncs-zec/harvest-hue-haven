import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryCard } from '@/components/CategoryCard';
import { FarmerCard } from '@/components/FarmerCard';
import { Beef, Milk, Carrot, Apple, MapPin, Egg, MapPinned, PhoneCall, Truck } from 'lucide-react';
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

const steps = [
  {
    icon: MapPinned,
    title: "Find Local Farms",
    description: "Use our interactive map to discover farms near you"
  },
  {
    icon: PhoneCall,
    title: "Contact the Farmer",
    description: "Connect directly with farmers to discuss products and arrange pickup"
  },
  {
    icon: Truck,
    title: "Get Fresh Food",
    description: "Pick up your fresh, locally sourced products directly from the farm"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-market-cream font-new-roman pb-20">
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
              className="text-lg font-bold bg-[#9b87f5] text-white px-6 py-2 rounded-full shadow-lg"
            >
              Support Local Agriculture
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-[#6E59A5] mt-4"
            >
              Fresh from Your Local Farms
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[#1A1F2C] mt-6 max-w-2xl mx-auto space-y-4 bg-[#D6BCFA]/10 p-6 rounded-lg shadow-sm"
            >
              <p className="font-semibold">
                By choosing local farms, you're not just getting fresher, more nutritious food - you're making a choice that benefits both the environment and your local economy.
              </p>
              <p className="text-[#7E69AB]">
                • Reduce food miles and carbon footprint
              </p>
              <p className="text-[#7E69AB]">
                • Support local farming families and preserve agricultural heritage
              </p>
              <p className="text-[#7E69AB]">
                • Get seasonal produce at peak freshness and nutrition
              </p>
              <p className="text-[#7E69AB]">
                • Build resilient local food systems for future generations
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-[#6E59A5] mb-8 text-center">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#9b87f5]/10 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-[#6E59A5]" />
                </div>
                <h3 className="text-xl font-semibold text-[#6E59A5] mb-2">{step.title}</h3>
                <p className="text-[#7E69AB] text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-[#6E59A5] mb-6">Categories</h2>
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
          <h2 className="text-2xl font-semibold text-market-brown mb-6">Recently Visited Farms</h2>
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
            <div className="bg-market-orange/10 p-8 rounded-2xl hover:bg-market-orange/20 transition-all cursor-pointer">
              <div className="flex items-center justify-center gap-4 mb-4">
                <h2 className="text-2xl font-semibold text-market-brown">Find Nearby Farms</h2>
              </div>
              <p className="text-market-brown/70">Discover local farms in your area using our interactive map</p>
            </div>
          </Link>
        </motion.section>

      </main>
      <Footer />
    </div>
  );
};

export default Index;