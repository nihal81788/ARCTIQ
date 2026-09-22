import { useState } from 'react';
import { Coordinate } from '../types/geo';

interface UseCoordinatesReturn {
  latInput: string;
  lngInput: string;
  error: string | null;
  setLatInput: (val: string) => void;
  setLngInput: (val: string) => void;
  validateAndGetCoords: () => Coordinate | null;
}

export function useCoordinates(): UseCoordinatesReturn {
  const [latInput, setLatInput] = useState<string>('');
  const [lngInput, setLngInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const validateAndGetCoords = (): Coordinate | null => {
    setError(null);
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);

    if (isNaN(lat) || isNaN(lng)) {
      setError('Please enter valid numbers for latitude and longitude.');
      return null;
    }

    if (lat < -90 || lat > 90) {
      setError('Latitude must be between -90 and 90.');
      return null;
    }

    if (lng < -180 || lng > 180) {
      setError('Longitude must be between -180 and 180.');
      return null;
    }

    return { lat, lng };
  };

  return {
    latInput,
    lngInput,
    error,
    setLatInput,
    setLngInput,
    validateAndGetCoords
  };
}
