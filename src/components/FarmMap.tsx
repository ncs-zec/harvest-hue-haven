import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from './ui/use-toast';
import MapInitializer from './map/MapInitializer';
import LocationSearch from './map/LocationSearch';
import { MapService } from './map/MapService';

const FarmMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      map.current = MapService.initializeMap(mapContainer.current, mapboxToken, toast);
      setIsMapInitialized(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize map. Please check your Mapbox token.",
        variant: "destructive"
      });
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    const location = await MapService.searchLocation(
      searchQuery,
      mapboxToken,
      map.current,
      marker.current,
      toast
    );

    if (location) {
      marker.current = new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .addTo(map.current!);

      localStorage.setItem('farmerLocation', JSON.stringify(location));
    }
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem('farmerLocation');
    if (savedLocation && map.current) {
      const { lng, lat } = JSON.parse(savedLocation);
      map.current.setCenter([lng, lat]);
      marker.current = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [isMapInitialized]);

  return (
    <div className="w-full space-y-4 font-new-roman">
      {!isMapInitialized ? (
        <MapInitializer
          mapboxToken={mapboxToken}
          setMapboxToken={setMapboxToken}
          onInitialize={initializeMap}
        />
      ) : (
        <LocationSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
      )}
      <div
        ref={mapContainer}
        className={`w-full h-[400px] rounded-lg ${
          !isMapInitialized ? 'bg-gray-100' : ''
        }`}
      />
    </div>
  );
};

export default FarmMap;