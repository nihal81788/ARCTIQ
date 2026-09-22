import React from 'react';
import { Navigation } from 'lucide-react';
import { Coordinate } from '../../types/geo';
import { PRESETS } from '../../constants/presets';
import { useCoordinates } from '../../hooks/useCoordinates';

interface CoordinatePanelProps {
  flyTo: (coord: Coordinate) => void;
}

export function CoordinatePanel({ flyTo }: CoordinatePanelProps) {
  const {
    latInput,
    lngInput,
    error,
    setLatInput,
    setLngInput,
    validateAndGetCoords
  } = useCoordinates();

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    const coords = validateAndGetCoords();
    if (coords) {
      flyTo(coords);
    }
  };

  const handlePreset = (name: string, coord: Coordinate) => {
    setLatInput(coord.lat.toString());
    setLngInput(coord.lng.toString());
    flyTo(coord);
  };

  return (
    <div className="absolute top-24 left-6 z-10 w-80 bg-background/90 backdrop-blur-md border border-border/50 rounded-lg shadow-xl p-4 mt-24">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Navigation className="w-5 h-5 text-primary" />
          Navigate
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Enter coordinates or use a preset</p>
      </div>

      <form onSubmit={handleNavigate} className="space-y-3 mb-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Latitude</label>
            <input
              type="number"
              step="any"
              value={latInput}
              onChange={(e) => setLatInput(e.target.value)}
              placeholder="-90 to 90"
              className="w-full bg-secondary/50 border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors mt-1"
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Longitude</label>
            <input
              type="number"
              step="any"
              value={lngInput}
              onChange={(e) => setLngInput(e.target.value)}
              placeholder="-180 to 180"
              className="w-full bg-secondary/50 border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors mt-1"
            />
          </div>
        </div>
        
        {error && (
          <p className="text-xs text-destructive bg-destructive/10 p-2 rounded">{error}</p>
        )}
        {(parseFloat(latInput) === 90 || parseFloat(latInput) === -90) && (
          <p className="text-xs text-primary bg-primary/10 p-2 rounded">At pole — longitude irrelevant</p>
        )}

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded transition-colors"
        >
          Navigate to Coords
        </button>
      </form>

      <div>
        <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1 mb-2 block">Quick Presets</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(PRESETS).map(([name, coord]) => (
            <button
              key={name}
              onClick={() => handlePreset(name, coord)}
              className="text-xs bg-secondary hover:bg-secondary/80 border border-border/50 text-foreground py-1.5 px-2 rounded transition-colors text-left truncate"
              title={name}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
