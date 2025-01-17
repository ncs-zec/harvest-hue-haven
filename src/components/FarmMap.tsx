import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

const FarmMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const { toast } = useToast();

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40],
        zoom: 9
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add geolocation control
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        })
      );

      setIsMapInitialized(true);
      toast({
        title: "Map initialized",
        description: "You can now locate farms near you!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize map. Please check your Mapbox token.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="w-full space-y-4 font-new-roman">
      {!isMapInitialized && (
        <div className="space-y-2">
          <p className="text-market-brown">
            Please enter your Mapbox token to initialize the map:
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="Enter your Mapbox token..."
              className="flex-1"
            />
            <Button onClick={initializeMap} disabled={!mapboxToken}>
              Initialize Map
            </Button>
          </div>
          <p className="text-sm text-market-brown/70">
            You can get your Mapbox token from{' '}
            <a
              href="https://www.mapbox.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-market-orange hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
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