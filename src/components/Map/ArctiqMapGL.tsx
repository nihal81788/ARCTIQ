import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMap } from '../../hooks/useMap';
import { MarkerLayer } from './MarkerLayer';
import { Header } from '../layout/Header';
import { RegionToggle } from '../layout/RegionToggle';
import { CoordinatePanel } from '../panels/CoordinatePanel';
import { LayerControl } from '../panels/LayerControl';
import { CoordDisplay } from '../panels/CoordDisplay';

export function ArctiqMapGL() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const {
    mapRef,
    viewState,
    setViewState,
    cursorCoords,
    setCursorCoords,
    targetCoord,
    flyTo
  } = useMap();

  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [viewState.center.lng, viewState.center.lat],
      zoom: viewState.zoom,
      projection: 'mercator'
    });

    map.on('move', () => {
      setViewState({
        center: { lat: map.getCenter().lat, lng: map.getCenter().lng },
        zoom: map.getZoom()
      });
    });

    map.on('mousemove', (e: mapboxgl.MapMouseEvent) => {
      setCursorCoords({ lat: e.lngLat.lat, lng: e.lngLat.lng });
    });

    mapRef.current = map;
    setMapInstance(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <Header />
      <RegionToggle flyTo={flyTo} />
      <CoordinatePanel flyTo={flyTo} />
      <LayerControl />
      <CoordDisplay viewState={viewState} cursorCoords={cursorCoords} />
      
      <div ref={mapContainer} className="absolute inset-0 w-full h-full z-0" />
      
      {mapInstance && <MarkerLayer map={mapInstance} targetCoord={targetCoord} />}
    </div>
  );
}
