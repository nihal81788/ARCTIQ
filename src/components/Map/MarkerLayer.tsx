import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Coordinate } from '../../types/geo';

interface MarkerLayerProps {
  map: mapboxgl.Map | null;
  targetCoord: Coordinate | null;
}

export function MarkerLayer({ map, targetCoord }: MarkerLayerProps) {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!map || !targetCoord) return;

    if (!markerRef.current) {
      const el = document.createElement('div');
      el.className = 'marker-cyan';
      
      markerRef.current = new mapboxgl.Marker({ element: el })
        .setLngLat([targetCoord.lng, targetCoord.lat])
        .addTo(map);
    } else {
      markerRef.current.setLngLat([targetCoord.lng, targetCoord.lat]);
    }

  }, [map, targetCoord]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
      }
    };
  }, []);

  return null;
}
