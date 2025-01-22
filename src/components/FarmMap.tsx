import React, { useEffect, useRef, useState } from 'react';
import { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useToast } from './ui/use-toast';
import { MapService } from './map/MapService';
import LocationSearch from './map/LocationSearch';
import { Button } from './ui/button';

const FarmMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = MapService.initializeMap(mapContainer.current);
    
    // Load saved location if exists
    const savedLocation = localStorage.getItem('farmerLocation');
    if (savedLocation && map.current) {
      const { lat, lng } = JSON.parse(savedLocation);
      MapService.addUserMarker(map.current, [lat, lng], "Your Location");
      map.current.setView([lat, lng], 13);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const handleSearch = async () => {
    if (!searchQuery || !map.current) return;

    const location = await MapService.searchLocation(searchQuery, map.current, toast);
    if (location) {
      localStorage.setItem('farmerLocation', JSON.stringify(location));
    }
  };

  const findNearestFarm = () => {
    const savedLocation = localStorage.getItem('farmerLocation');
    if (!savedLocation || !map.current) {
      toast({
        title: "Location Required",
        children: "Please set your location first",
        variant: "destructive"
      });
      return;
    }

    const { lat, lng } = JSON.parse(savedLocation);
    const nearestFarm = MapService.findNearestFarm(lat, lng);
    
    map.current.setView([nearestFarm.lat, nearestFarm.lng], 13);
    toast({
      title: "Nearest Farm Found",
      children: `${nearestFarm.name} - ${nearestFarm.address}`
    });
  };

  return (
    <div className="w-full space-y-4 font-new-roman">
      <div className="flex gap-4 items-start">
        <div className="flex-1">
          <LocationSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>
        <Button
          onClick={findNearestFarm}
          className="bg-market-orange hover:bg-market-orange/90 text-white"
        >
          Find Nearest Farm
        </Button>
      </div>
      <div
        ref={mapContainer}
        className="w-full h-[400px] rounded-lg"
      />
    </div>
  );
};

export default FarmMap;