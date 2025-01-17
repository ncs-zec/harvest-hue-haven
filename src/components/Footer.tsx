import { Home, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-market-cream/80 backdrop-blur-lg border-t border-market-brown/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center gap-8">
          <Link to="/">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-market-orange/10 text-market-orange hover:bg-market-orange/20 transition-colors"
            >
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <Link to="/location">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-market-orange/10 text-market-orange hover:bg-market-orange/20 transition-colors"
            >
              <MapPin className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};