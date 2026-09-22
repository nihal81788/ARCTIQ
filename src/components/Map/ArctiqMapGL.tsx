import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
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

  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.openfreemap.org/styles/dark',
      center: [viewState.center.lng, viewState.center.lat],
      zoom: viewState.zoom,
      // @ts-ignore - maplibregl types might not have globe projection depending on version
      projection: { type: 'globe' }
    });

    map.on('move', () => {
      setViewState({
        center: { lat: map.getCenter().lat, lng: map.getCenter().lng },
        zoom: map.getZoom()
      });
    });

    map.on('mousemove', (e: maplibregl.MapMouseEvent) => {
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
