import L from 'leaflet';
import { type ToastProps } from '@/components/ui/toast';

export interface Location {
  lng: number;
  lat: number;
  address: string;
}

export class MapService {
  static async searchLocation(
    searchQuery: string,
    map: L.Map,
    toast: (props: ToastProps) => void
  ): Promise<Location | null> {
    try {
      // Using Nominatim (OpenStreetMap's free geocoding service)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const location = {
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          address: display_name
        };

        map.setView([location.lat, location.lng], 13);
        this.addMarker(map, [location.lat, location.lng]);

        toast({
          title: "Location found",
          children: display_name
        });

        return location;
      } else {
        toast({
          title: "Location not found",
          children: "Please try a different search term",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        children: "Failed to search location",
        variant: "destructive"
      });
    }
    return null;
  }

  static initializeMap(container: HTMLDivElement): L.Map {
    // Fix Leaflet's icon path issues
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    const map = L.map(container).setView([40, -74.5], 9);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map;
  }

  static addMarker(map: L.Map, position: [number, number]): void {
    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add new marker
    L.marker(position).addTo(map);
  }
}