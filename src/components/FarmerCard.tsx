import { motion } from 'framer-motion';

interface FarmerCardProps {
  name: string;
  image: string;
  specialty: string;
}

export const FarmerCard = ({ name, image, specialty }: FarmerCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-market-cream p-4 rounded-2xl shadow-lg transition-all duration-300 border border-market-brown/10"
    >
      <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="text-market-brown font-semibold text-lg">{name}</h3>
      <p className="text-market-brown/70 text-sm">{specialty}</p>
    </motion.div>
  );
};