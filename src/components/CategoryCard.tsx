import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

export const CategoryCard = ({ title, icon: Icon, description }: CategoryCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-market-cream p-6 rounded-2xl shadow-lg transition-all duration-300 border border-market-brown/10"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-market-orange/10 rounded-xl">
          <Icon className="w-6 h-6 text-market-orange" />
        </div>
        <div>
          <h3 className="text-market-brown font-semibold text-lg">{title}</h3>
          <p className="text-market-brown/70 text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};