import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface MapInitializerProps {
  mapboxToken: string;
  setMapboxToken: (token: string) => void;
  onInitialize: () => void;
}

const MapInitializer = ({ mapboxToken, setMapboxToken, onInitialize }: MapInitializerProps) => {
  return (
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
        <Button onClick={onInitialize} disabled={!mapboxToken}>
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
  );
};

export default MapInitializer;