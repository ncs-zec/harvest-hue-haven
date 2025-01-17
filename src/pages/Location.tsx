import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import FarmMap from '@/components/FarmMap';

const Location = () => {
  return (
    <div className="min-h-screen bg-market-cream font-new-roman pb-20">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-market-brown mb-6">Find Nearby Farms</h2>
          <FarmMap />
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Location;