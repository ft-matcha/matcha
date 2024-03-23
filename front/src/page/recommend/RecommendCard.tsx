import Card from '@/components/ui/Card';
import useSlider from '@/hooks/useSlider';
import Button from '@/components/ui/Button';

const RecommendCard = ({ profileList }: { profileList: string[] }) => {
  const { SliderElement, indexImage, getIndex } = useSlider(profileList, profileList[0]);

  return (
    <>
      <Card>
        <Card.Body>
          <SliderElement>
            <Button onClick={() => indexImage('prev')}>prev</Button>
            <Button
              onClick={() => {
                alert(`${getIndex()} is liked`);
              }}
            >
              like
            </Button>
            <Button
              onClick={() => {
                alert(`${getIndex()} is disliked`);
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
