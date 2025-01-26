import { motion } from 'framer-motion';

export const Benefits = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-12 text-center"
    >
      <h2 className="text-2xl font-bold text-market-brown mb-6">Why Choose Local Farms?</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-market-cream p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-market-brown mb-2">Fresher Produce</h3>
          <p className="text-market-brown/70">Get the freshest ingredients straight from local farms to your table</p>
        </div>
        <div className="bg-market-cream p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-market-brown mb-2">Support Local</h3>
          <p className="text-market-brown/70">Help your local farming community thrive and grow</p>
        </div>
        <div className="bg-market-cream p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-market-brown mb-2">Know Your Source</h3>
          <p className="text-market-brown/70">Build direct relationships with the farmers who grow your food</p>
        </div>
      </div>
    </motion.section>
  );
};