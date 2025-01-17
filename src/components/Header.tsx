import { ShoppingBasket } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 bg-market-cream/80 backdrop-blur-lg z-50 border-b border-market-brown/10"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-market-brown text-xl font-semibold">Local Market</h1>
        <button className="p-2 rounded-full bg-market-orange/10 text-market-orange hover:bg-market-orange/20 transition-colors">
          <ShoppingBasket className="w-6 h-6" />
        </button>
      </div>
    </motion.header>
  );
};