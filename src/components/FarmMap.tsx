import React, { useEffect, useRef, useState } from 'react';
import { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useToast } from './ui/use-toast';
import { MapService } from './map/MapService';
import LocationSearch from './map/LocationSearch';

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
      MapService.addMarker(map.current, [lat, lng]);
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

  return (
    <div className="w-full space-y-4 font-new-roman">
      <LocationSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <div
        ref={mapContainer}
        className="w-full h-[400px] rounded-lg"
      />
    </div>
  );
};

export default FarmMap;