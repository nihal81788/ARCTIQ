export interface Coordinate {
  lat: number;
  lng: number;
}

export interface MapViewState {
  center: Coordinate;
  zoom: number;
}

export interface LayerState {
  seaIce: boolean;
  aisShips: boolean;
  icebergs: boolean;
  weather: boolean;
  bathymetry: boolean;
}
