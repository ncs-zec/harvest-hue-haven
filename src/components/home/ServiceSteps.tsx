import { motion } from 'framer-motion';
import { MapPin, Phone, Salad } from 'lucide-react';

export const ServiceSteps = () => {
  const steps = [
    {
      icon: MapPin,
      title: "Locate Farm",
      description: "Find local farms near you using our interactive map"
    },
    {
      icon: Phone,
      title: "Contact Farm",
      description: "Connect directly with farmers to discuss products and arrange pickup"
    },
    {
      icon: Salad,
      title: "Get Food",
      description: "Enjoy fresh, locally sourced produce and products"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-market-brown mb-6 text-center">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-market-orange/10 rounded-full flex items-center justify-center mb-4">
              <step.icon className="w-8 h-8 text-market-orange" />
            </div>
            <h3 className="text-lg font-semibold text-market-brown mb-2">{step.title}</h3>
            <p className="text-market-brown/70">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};