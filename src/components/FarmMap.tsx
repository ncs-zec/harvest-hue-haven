import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { Search } from 'lucide-react';

const FarmMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const searchLocation = async () => {
    if (!searchQuery) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${mapboxToken}&limit=1`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        
        if (map.current) {
          map.current.flyTo({
            center: [lng, lat],
            zoom: 14
          });

          // Remove existing marker if any
          if (marker.current) {
            marker.current.remove();
          }

          // Add new marker
          marker.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map.current);

          toast({
            title: "Location found",
            description: data.features[0].place_name
          });

          // Save location to localStorage (you might want to save this to a database in production)
          localStorage.setItem('farmerLocation', JSON.stringify({
            lng,
            lat,
            address: data.features[0].place_name
          }));
        }
      } else {
        toast({
          title: "Location not found",
          description: "Please try a different search term",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search location",
        variant: "destructive"
      });
    }
  };

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
        description: "You can now search for your farm location!"
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
    // Try to load saved location
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
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for your farm location..."
              className="flex-1"
            />
            <Button onClick={searchLocation} disabled={!searchQuery}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
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