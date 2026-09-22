import { useRef, useCallback, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import { Coordinate, MapViewState } from '../types/geo';

export function useMap() {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [viewState, setViewState] = useState<MapViewState>({
    center: { lat: 90, lng: 0 },
    zoom: 2
  });
  const [cursorCoords, setCursorCoords] = useState<Coordinate | null>(null);
  const [targetCoord, setTargetCoord] = useState<Coordinate | null>(null);

  const flyTo = useCallback((coord: Coordinate, zoom: number = 6) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [coord.lng, coord.lat],
        zoom,
        duration: 2000
      });
      setTargetCoord(coord);
    }
  }, []);

  return {
    mapRef,
    viewState,
    setViewState,
    cursorCoords,
    setCursorCoords,
    targetCoord,
    setTargetCoord,
    flyTo
  };
}
