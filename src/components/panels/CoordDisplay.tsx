import React from 'react';
import { Coordinate, MapViewState } from '../../types/geo';

interface CoordDisplayProps {
  viewState: MapViewState;
  cursorCoords: Coordinate | null;
}

export function CoordDisplay({ viewState, cursorCoords }: CoordDisplayProps) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur-md border border-border/50 text-foreground px-4 py-2 rounded-full shadow-lg pointer-events-auto flex items-center gap-6 text-xs font-mono">
      <div className="flex flex-col items-center">
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Map Center</span>
        <span>
          {viewState.center.lat.toFixed(4)}°, {viewState.center.lng.toFixed(4)}°
        </span>
      </div>
      <div className="w-px h-6 bg-border/50" />
      <div className="flex flex-col items-center">
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Zoom</span>
        <span>{viewState.zoom.toFixed(1)}</span>
      </div>
      <div className="w-px h-6 bg-border/50" />
      <div className="flex flex-col items-center min-w-[120px]">
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Cursor</span>
        <span>
          {cursorCoords ? `${cursorCoords.lat.toFixed(4)}°, ${cursorCoords.lng.toFixed(4)}°` : '--'}
        </span>
      </div>
    </div>
  );
}
