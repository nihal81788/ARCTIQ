import React from 'react';
import { cn } from '../../lib/utils';
import { Coordinate } from '../../types/geo';

interface RegionToggleProps {
  flyTo: (coord: Coordinate, zoom?: number) => void;
}

export function RegionToggle({ flyTo }: RegionToggleProps) {
  return (
    <div className="absolute top-24 left-6 z-10 flex flex-col gap-2 pointer-events-none">
      <button
        onClick={() => flyTo({ lat: 85, lng: 0 }, 2.5)}
        className={cn(
          "pointer-events-auto bg-background/80 backdrop-blur-md border border-border/50 text-foreground px-4 py-2 rounded-md shadow-lg transition-all hover:bg-background hover:border-primary/50 text-sm font-medium w-28 text-center cursor-pointer"
        )}
      >
        Arctic
      </button>
      <button
        onClick={() => flyTo({ lat: -85, lng: 0 }, 2.5)}
        className={cn(
          "pointer-events-auto bg-background/80 backdrop-blur-md border border-border/50 text-foreground px-4 py-2 rounded-md shadow-lg transition-all hover:bg-background hover:border-primary/50 text-sm font-medium w-28 text-center cursor-pointer"
        )}
      >
        Antarctic
      </button>
    </div>
  );
}
