import mapboxgl from 'mapbox-gl';
import { type ToastProps } from '@/components/ui/toast';

export interface Location {
  lng: number;
  lat: number;
  address: string;
}

export class MapService {
  static async searchLocation(
    searchQuery: string,
    mapboxToken: string,
    map: mapboxgl.Map | null,
    marker: mapboxgl.Marker | null,
    toast: (props: ToastProps) => void
  ): Promise<Location | null> {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${mapboxToken}&limit=1`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        
        if (map) {
          map.flyTo({
            center: [lng, lat],
            zoom: 14
          });

          if (marker) {
            marker.remove();
          }

          const newMarker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map);

          toast({
            title: "Location found",
            children: data.features[0].place_name
          });

          return {
            lng,
            lat,
            address: data.features[0].place_name
          };
        }
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

  static initializeMap(
    container: HTMLDivElement,
    mapboxToken: string,
    toast: (props: ToastProps) => void
  ): mapboxgl.Map {
    mapboxgl.accessToken = mapboxToken;
    
    const map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      })
    );

    toast({
      title: "Map initialized",
      children: "You can now search for your farm location!"
    });

    return map;
  }
}