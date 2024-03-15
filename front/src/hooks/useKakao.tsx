import { IWindow } from '@/types';
import useGeolocation from '@/hooks/useGeolocation';
import { useEffect, useRef, useState } from 'react';

const { kakao } = window as unknown as IWindow;

const useKakao = () => {
  const [obj, setObj] = useState<Element>();
  const [coord, setCoord] = useGeolocation();
  const [latlng, setLatLng] = useState<[number, number]>([0, 0]);
  const ref = useRef<any>(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    setCoord();
  }, []);

  useEffect(() => {
    if (coord[0] === 0 && coord[1] === 0) return;
    setLatLng(coord);

    if (!ref.current) {
      createKakaoMap();
      return;
    }
  }, [coord]);

  useEffect(() => {
    if (ref.current) {
      kakao.maps.event.addListener(ref.current, 'rightclick', (mouseEvent: any) => {
        const latlng = mouseEvent.latLng;
        setLatLng([latlng.getLat(), latlng.getLng()]);
      });
      return () => {
        kakao.maps.event.removeListener(ref.current, 'rightclick');
      };
    }
  }, [ref.current]);

  useEffect(() => {
    changeKakaoMap(latlng[0], latlng[1]);
    setAddr();
  }, [latlng]);

  const createKakaoMap = () => {
    if (!latlng) return;
    const options = {
      center: setCenter(latlng[0], latlng[1]),
      level: 3,
    };
    ref.current = new kakao.maps.Map(obj, options);
  };

  const setCenter = (lat: number, lng: number) => {
    return new kakao.maps.LatLng(lat, lng);
  };

  const changeKakaoMap = (lat: number, lng: number) => {
    if (!ref.current) return;
    const moveLatLon = setCenter(lat, lng);
    ref.current.setCenter(moveLatLon);
  };

  const setRef = (ref: Element) => {
    setObj(ref);
  };

  const getAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(latlng[0], latlng[1]);
    const test = () => {
      return new Promise((resolve, reject) => {
        geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const newAdress = result[0].address.address_name;
            resolve(newAdress);
          } else {
            resolve(address);
          }
        });
      });
    };
    return test()
      .then((res) => res)
      .catch(() => '');
  };

  const setAddr = async () => {
    const result = await getAddress();
    setAddress(result as string);
  };

  return [address, setRef, getAddress] as const;
};

export default useKakao;
