import Card from '@/components/ui/Card';
import useSlider from '@/hooks/useSlider';
import Button from '@/components/ui/Button';
import useApi from '@/hooks/useApi';
import { ModalContext } from '@/provider/ModalProvider';
import { useContext } from 'react';

const RecommendCard = ({ randomData }: { randomData: { id: string; profileList: string[] } }) => {
  const { SliderElement, indexImage } = useSlider(
    randomData.profileList,
    randomData.profileList[0],
  );
  const api = useApi();
  const { setModal } = useContext(ModalContext);
  return (
    <>
      <Card>
        <Card.Body>
          <SliderElement
            onClick={() => {
              setModal({
                modalType: 'profileModal',
                toggle: true,
                data: { id: randomData.id, img: randomData.profileList },
              });
            }}
          >
            <Button onClick={() => indexImage('prev')}>prev</Button>
            <Button
              onClick={() => {
                console.log(`will be posted to server ${randomData.id} is liked`);
              }}
            >
              like
            </Button>
            <Button
              onClick={() => {
                console.log(`will be posted to server ${randomData.id} is disliked`);
                // api('post', 'user/dislike', { id: randomData.id });
              }}
            >
              dislike
            </Button>
            <Button onClick={() => indexImage('next')}>next</Button>
          </SliderElement>
        </Card.Body>
      </Card>
    </>
  );
};

export default RecommendCard;
