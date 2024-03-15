import useKakao from '@/hooks/useKakao';
import React from 'react';

const GeoLocation = ({
  setFunnel,
  children,
}: {
  setFunnel: (
    props: (data: Record<string, any>) => Record<string, any> | Record<string, any>,
  ) => void;
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
    console.log(address);
    alert(address);
  }, [address]);
  return (
    <>
      <div ref={kakaoRef} style={{ width: '600px', height: '400px' }}></div>
    </>
  );
};

export default GeoLocation;
