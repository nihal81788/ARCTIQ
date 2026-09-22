import React, { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import { Coordinate } from '../../types/geo';

interface MarkerLayerProps {
  map: maplibregl.Map | null;
  targetCoord: Coordinate | null;
}

export function MarkerLayer({ map, targetCoord }: MarkerLayerProps) {
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!map || !targetCoord) return;

    if (!markerRef.current) {
      const el = document.createElement('div');
      el.className = 'marker-cyan';
      
      markerRef.current = new maplibregl.Marker({ element: el })
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
