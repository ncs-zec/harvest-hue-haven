import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { MapPin } from 'lucide-react';

export const Hero = () => {
  return (
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
          className="text-lg text-market-black/70 max-w-2xl mx-auto mb-8"
        >
          Connect directly with local farmers for the freshest produce and support your community. 
          Experience the difference of farm-fresh ingredients while building lasting relationships 
          with the farmers who grow your food.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/location">
            <Button 
              size="lg" 
              className="bg-market-orange hover:bg-market-orange/90 text-white gap-2"
            >
              <MapPin className="w-5 h-5" />
              Find Local Farms Near You
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};