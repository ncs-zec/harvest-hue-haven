import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';
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
const savedFarmers = [
  { id: 1, name: "Green Acres Farm", location: "123 Farm Road" },
  { id: 2, name: "Sunny Valley Fruits", location: "456 Valley Lane" },
];

export const Header = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 bg-market-cream/80 backdrop-blur-lg z-50 border-b border-market-brown/10"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-market-brown text-xl font-semibold font-new-roman">Local Market</h1>
        
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
                  Saved Farmers
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-4">
                {savedFarmers.length > 0 ? (
                  <div className="space-y-4">
                    {savedFarmers.map((farmer) => (
                      <div key={farmer.id}>
                        <div className="flex flex-col gap-1 p-2 rounded-lg bg-market-cream/50">
                          <h3 className="font-new-roman text-market-brown font-medium">
                            {farmer.name}
                          </h3>
                          <p className="text-sm text-market-brown/70">
                            {farmer.location}
                          </p>
                        </div>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-market-brown/70">
                    No saved farmers yet
                  </p>
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </motion.header>
  );
};