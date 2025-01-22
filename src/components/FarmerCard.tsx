import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface FarmerCardProps {
  name: string;
  image: string;
  specialty: string;
  visitedAt?: Date;
}

export const FarmerCard = ({ name, image, specialty, visitedAt }: FarmerCardProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

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
      <p className="text-market-brown/70 text-sm mb-2">{specialty}</p>
      {visitedAt && (
        <p className="text-market-brown/50 text-xs mb-4">
          Last visited: {formatDate(visitedAt)}
        </p>
      )}
      <Link to={`/location?farm=${encodeURIComponent(name)}`}>
        <Button 
          className="w-full bg-market-orange hover:bg-market-orange/90 text-white"
          size="sm"
        >
          <MapPin className="w-4 h-4 mr-2" />
          View Location & Contact
        </Button>
      </Link>
    </motion.div>
  );
};