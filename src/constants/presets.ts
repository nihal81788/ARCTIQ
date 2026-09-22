import { Coordinate } from '../types/geo';

export const PRESETS: Record<string, Coordinate> = {
  'North Pole': { lat: 90, lng: 0 },
  'Arctic Circle': { lat: 66.5, lng: 0 },
  'McMurdo Station': { lat: -77.85, lng: 166.67 },
  'South Pole': { lat: -90, lng: 0 },
};
