import { useEffect, useState } from 'react';

const useGeolocation = () => {
  const [coords, setCoords] = useState<[number, number]>([0, 0]);

  const onSuccess = ({ coords }: { coords: { latitude: number; longitude: number } }) => {
    setCoords([coords.latitude, coords.longitude]);
  };

  const onNavigate = () => {
    window.navigator.geolocation.getCurrentPosition(onSuccess);
  };

  return [coords, onNavigate] as const;
};

export default useGeolocation;
