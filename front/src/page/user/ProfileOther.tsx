import useSlider from '@/hooks/useSlider';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  img {
    width: 80%;
    height: 80%;
    aspect-ratio: 1;
  }
`;

const ProfileList = ({ id, img = [] }: { id?: string; img?: string[] }) => {
  const { SliderElement } = useSlider(img, img[0]);
  return (
    <>
      <ProfileContainer>
        {id}
        <SliderElement>
          <button>prev</button>
          <button>like</button>
          <button>dislike</button>
          <button>next</button>
        </SliderElement>
      </ProfileContainer>
    </>
  );
};

export default ProfileList;
