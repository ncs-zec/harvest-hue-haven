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
  phone: string;
  email: string;
}

// Sample farmer data - in a real app, this would come from your database
const SAMPLE_FARMERS: FarmerLocation[] = [
  {
    id: '1',
    name: "Green Acres Farm",
    lat: 40.7128,
    lng: -74.0060,
    address: "New York, NY",
    phone: "(555) 123-4567",
    email: "contact@greenacres.com"
  },
  {
    id: '2',
    name: "Sunny Valley Produce",
    lat: 40.7589,
    lng: -73.9851,
    address: "Manhattan, NY",
    phone: "(555) 234-5678",
    email: "hello@sunnyvalley.com"
  },
  {
    id: '3',
    name: "Fresh Fields Farm",
    lat: 40.7829,
    lng: -73.9654,
    address: "Upper East Side, NY",
    phone: "(555) 345-6789",
    email: "info@freshfields.com"
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
        this.addUserMarker(map, [location.lat, location.lng], "Your Location");

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
    const map = L.map(container).setView([40.7128, -74.0060], 9);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add farmer markers
    this.addFarmerMarkers(map);

    return map;
  }

  static createRedPinIcon(): L.Icon {
    return L.icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGMDAwMCI+PHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDljMCA1LjI1IDcgMTMgNyAxM3M3LTcuNzUgNy0xM2MwLTMuODctMy4xMy03LTctN3ptMCA5LjVjLTEuMzggMC0yLjUtMS4xMi0yLjUtMi41czEuMTItMi41IDIuNS0yLjUgMi41IDEuMTIgMi41IDIuNS0xLjEyIDIuNS0yLjUgMi41eiIvPjwvc3ZnPg==',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  }

  static createUserIcon(): L.Icon {
    return L.icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0Y5NzMxNiI+PHBhdGggZD0iTTEyIDRhNCA0IDAgMTAwIDhhNCA0IDAgMDAwLTh6bTAgMTBjNC40MiAwIDggMS43OSA4IDR2MkgxNnYtMmMwLTEuMS0xLjktMi0zLjUtMi0xLjYgMC0zLjUuOS0zLjUgMnYySDR2LTJjMC0yLjIxIDMuNTgtNCA4LTR6Ii8+PC9zdmc+',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  }

  static addUserMarker(map: L.Map, position: [number, number], title: string): void {
    L.marker(position, { icon: this.createUserIcon() })
      .bindPopup(title)
      .addTo(map);
  }

  static addFarmerMarker(map: L.Map, position: [number, number], title: string): void {
    L.marker(position, { icon: this.createRedPinIcon() })
      .bindPopup(title)
      .addTo(map);
  }

  static addFarmerMarkers(map: L.Map): void {
    SAMPLE_FARMERS.forEach(farmer => {
      this.addFarmerMarker(map, [farmer.lat, farmer.lng], `
        <div class="farmer-popup">
          <h3 class="font-bold">${farmer.name}</h3>
          <p>${farmer.address}</p>
          <p class="mt-2">
            <strong>Contact:</strong><br>
            📞 ${farmer.phone}<br>
            ✉️ ${farmer.email}
          </p>
        </div>
      `);
    });
  }

  static findNearestFarm(userLat: number, userLng: number): FarmerLocation {
    return SAMPLE_FARMERS.reduce((nearest, current) => {
      const distanceToCurrent = this.calculateDistance(
        userLat, userLng,
        current.lat, current.lng
      );
      const distanceToNearest = this.calculateDistance(
        userLat, userLng,
        nearest.lat, nearest.lng
      );
      return distanceToCurrent < distanceToNearest ? current : nearest;
    }, SAMPLE_FARMERS[0]);
  }

  static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  static deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}