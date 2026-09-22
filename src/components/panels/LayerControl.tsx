import React from 'react';
import { Layers } from 'lucide-react';
import { cn } from '../../lib/utils';

export function LayerControl() {
  const layers = [
    { id: 'seaIce', name: 'Sea Ice Concentration' },
    { id: 'aisShips', name: 'AIS Ship Positions' },
    { id: 'icebergs', name: 'Iceberg Positions' },
    { id: 'weather', name: 'Weather Overlay' },
    { id: 'bathymetry', name: 'Bathymetry' },
  ];

  return (
    <div className="absolute top-24 right-6 z-10 w-64 bg-background/90 backdrop-blur-md border border-border/50 rounded-lg shadow-xl p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          Map Layers
        </h2>
      </div>

      <div className="space-y-4">
        {layers.map((layer) => (
          <div key={layer.id} className="flex items-center justify-between">
            <span className="text-sm text-foreground">{layer.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-wider font-bold bg-muted text-muted-foreground px-1.5 py-0.5 rounded border border-border">
                Soon
              </span>
              <button
                disabled
                className="w-8 h-4 rounded-full bg-secondary border border-border relative opacity-50 cursor-not-allowed"
              >
                <div className="w-3 h-3 bg-muted-foreground rounded-full absolute left-0.5 top-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
