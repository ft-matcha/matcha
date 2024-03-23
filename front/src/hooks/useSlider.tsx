import { ReactNode, useState } from 'react';
import styled from 'styled-components';

interface ImageProps<T extends readonly string[]> {
  img: T[number];
  children: ReactNode;
  onClick?: (props: any) => void;
}

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  left: 0;
  width: 100%;
  justify-content: space-between;
  z-index: 30;
  background: ${({ theme }) => theme.background};
  button {
    color: ${({ theme }) => theme.color};
    font-size: 2.5rem;
  }
`;

const SliderImage = ({
  img,
  children,
  onClick,
}: {
  img: string;
  children?: React.ReactNode;
  onClick?: (props: any) => void;
}) => {
  console.log(onClick);
  return (
    <ImageContainer>
      <img src={img} alt={img} onClick={onClick} />
      <ButtonContainer>{children}</ButtonContainer>
    </ImageContainer>
  );
};

const useSlider = <T extends string[]>(images: T, defaultImage: T[number]) => {
  const [image, setImage] = useState(defaultImage);

  const indexImage = (type: 'next' | 'prev') => {
    const currentIndex = images.indexOf(image);
    if (type === 'next') {
      if (currentIndex === images.length - 1) {
        setImage(images[0]);
      } else {
        setImage(images[currentIndex + 1]);
      }
      return;
    }
    if (currentIndex === 0) {
      setImage(images[images.length - 1]);
    } else {
      setImage(images[currentIndex - 1]);
    }
  };
  const getIndex = () => images.indexOf(image);

  const SliderElement = Object.assign((props: Omit<ImageProps<T>, 'img'>) => (
    <SliderImage img={image} {...props} />
  ));
  return { SliderElement, indexImage, getIndex };
};

export default useSlider;
