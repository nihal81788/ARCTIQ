import React from 'react';
import { Anchor } from 'lucide-react';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 pointer-events-none">
      <div className="flex items-center gap-3 bg-background/80 backdrop-blur-md px-4 py-2 rounded-lg border border-border/50 shadow-lg pointer-events-auto">
        <Anchor className="text-primary w-6 h-6" />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-wider text-foreground m-0 leading-tight">
            ARCTIQ
          </h1>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Navigate where no map exists
          </span>
        </div>
      </div>
      
      <div className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md pointer-events-auto">
        Phase 1 — Foundation
      </div>
    </header>
  );
}
