import L from 'leaflet';
import { type ToastProps } from '@/components/ui/toast';

export interface Location {
  lng: number;
  lat: number;
  address: string;
}

export interface FarmerLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
}

// Sample farmer data - in a real app, this would come from your database
const SAMPLE_FARMERS: FarmerLocation[] = [
  {
    id: '1',
    name: "Green Acres Farm",
    lat: 40.7128,
    lng: -74.0060,
    address: "New York, NY"
  },
  {
    id: '2',
    name: "Sunny Valley Produce",
    lat: 40.7589,
    lng: -73.9851,
    address: "Manhattan, NY"
  },
  {
    id: '3',
    name: "Fresh Fields Farm",
    lat: 40.7829,
    lng: -73.9654,
    address: "Upper East Side, NY"
  }
];

export class MapService {
  static async searchLocation(
    searchQuery: string,
    map: L.Map,
    toast: (props: ToastProps) => void
  ): Promise<Location | null> {
    try {
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
        this.addMarker(map, [location.lat, location.lng], "Your Location");

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
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    const map = L.map(container).setView([40.7128, -74.0060], 9);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add farmer markers
    this.addFarmerMarkers(map);

    return map;
  }

  static addMarker(map: L.Map, position: [number, number], title: string): void {
    L.marker(position)
      .bindPopup(title)
      .addTo(map);
  }

  static addFarmerMarkers(map: L.Map): void {
    SAMPLE_FARMERS.forEach(farmer => {
      this.addMarker(map, [farmer.lat, farmer.lng], `
        <div class="farmer-popup">
          <h3 class="font-bold">${farmer.name}</h3>
          <p>${farmer.address}</p>
        </div>
      `);
    });
  }
}