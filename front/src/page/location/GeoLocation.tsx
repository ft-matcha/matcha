import useKakao from '@/hooks/useKakao';
import React, { useMemo } from 'react';

const GeoLocation = ({
  setFunnel,
  addressRef,
  children,
}: {
  setFunnel: (
    props: (data: Record<string, any>) => Record<string, any> | Record<string, any>,
  ) => void;
  addressRef: React.MutableRefObject<string | null>;
  children: React.ReactNode;
}) => {
  const [address, setRef] = useKakao();
  const kakaoRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (kakaoRef.current) {
      setRef(kakaoRef.current);
    }
  }, [kakaoRef]);

  React.useEffect(() => {
    if (address) {
      // setFunnel((prev) => ({ ...prev, address: address }));
      addressRef.current = address;
    }
  }, [address]);
  return (
    <>
      <div ref={kakaoRef} style={{ width: '600px', height: '400px' }}></div>
      {children}
    </>
  );
};

export default GeoLocation;
