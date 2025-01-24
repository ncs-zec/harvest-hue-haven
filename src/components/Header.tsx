import { Menu, User, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// This would typically come from a state management solution
const userData = {
  name: "John Doe",
  email: "john@example.com",
  location: "San Francisco, CA",
  joinedDate: "January 2024",
  isFarmer: false
};

export const Header = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 bg-market-cream/80 backdrop-blur-lg z-50 border-b border-market-brown/10"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-market-brown text-xl font-semibold font-new-roman">Local Market</h1>
        
        <div className="flex items-center gap-4">
          <Drawer>
            <DrawerTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="p-2 rounded-full bg-market-orange/10 text-market-orange hover:bg-market-orange/20 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle className="text-center font-new-roman text-market-brown">
                    Profile Settings
                  </DrawerTitle>
                </DrawerHeader>
                <div className="p-4 space-y-6">
                  {/* Profile Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-market-cream/50 rounded-lg">
                      <div className="p-2 bg-market-orange/10 rounded-full">
                        <User className="w-6 h-6 text-market-orange" />
                      </div>
                      <div>
                        <h3 className="font-new-roman text-market-brown font-medium">
                          {userData.name}
                        </h3>
                        <p className="text-sm text-market-brown/70">
                          {userData.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 px-3">
                      <MapPin className="w-4 h-4 text-market-brown/70" />
                      <span className="text-sm text-market-brown/70">{userData.location}</span>
                    </div>
                    
                    <div className="px-3 text-sm text-market-brown/70">
                      Member since {userData.joinedDate}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-market-brown hover:text-market-orange hover:bg-market-orange/10"
                    >
                      <Heart className="w-4 h-4" />
                      Your Favorite Farms
                    </Button>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </motion.header>
  );
};