import { motion } from 'framer-motion';

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
          className="text-4xl font-bold text-market-brown mb-4"
        >
          Fresh from Your Local Farms
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-market-brown/70 max-w-2xl mx-auto"
        >
          Connect directly with local farmers for the freshest produce and support your community. 
          Experience the difference of farm-fresh ingredients while building lasting relationships 
          with the farmers who grow your food.
        </motion.p>
      </div>
    </motion.section>
  );
};