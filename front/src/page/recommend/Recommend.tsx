import CardList from '@/components/CardList';
import ReactDOM, { createPortal } from 'react-dom';
import { Link, useParams, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import RecommendResult from '@/page/recommend/RecommendResult';
import { useContext, useEffect } from 'react';
import { ModalContext } from '@/provider/ModalProvider';
import Nav from '@/components/ui/Nav';

const RecommendData = [
  {
    title: '스포츠',
    url: 'sports',
    image: 'url(https://marketing-images.gotinder.com/explore/vert_sporty_v2.webp)',
  },
  {
    title: '음악',
    url: 'music',
    image: 'url(https://marketing-images.gotinder.com/explore/vert_musiclovers_v2.webp)',
  },
  {
    title: '야외활동',
    url: 'outdoor',
    image: 'url(https://marketing-images.gotinder.com/explore/vert_wanderlust_v2.webp)',
  },
  {
    title: '음식',
    url: 'food',
    image: 'url(https://marketing-images.gotinder.com/explore/vert_foodies_v2.webp)',
  },
  {
    title: '영화',
    url: 'movie',
    image: 'url(https://marketing-images.gotinder.com/explore/vert_animalparents_v2.webp);',
  },
  {
    title: '게임',
    url: 'game',
    image: 'url(https://marketing-images.gotinder.com/explore/vert_thrillseekers_v2.webp);',
  },
];

const recommendMobile = ({
  modalProp,
  setModal,
}: {
  modalProp: { modalType: string; toggle: boolean };
  setModal: (modalProp: { modalType: string; toggle: boolean }) => void;
}) => {
  if (modalProp.modalType === 'recommendModal' && modalProp.toggle) {
    return;
  }
  setModal({ toggle: true, modalType: 'recommendModal' });
};

const recommendDesktop = () => {
  return ReactDOM.createPortal(<RecommendResult />, document.getElementById('main') as Element);
};

const recommendCondition = ({
  mobile,
  modalProp,
  setModal,
}: {
  mobile: 'mobile' | 'desktop';
  modalProp: { modalType: string; toggle: boolean };
  setModal: (modalProp: { modalType: string; toggle: boolean }) => void;
}) => {
  return mobile === 'mobile' ? recommendMobile({ modalProp, setModal }) : recommendDesktop();
};

const Recommend = () => {
  const params = useParams();
  const { modalProp, setModal } = useContext(ModalContext);

  if (params.id) {
    recommendCondition({
      mobile: document.body.clientWidth > 768 ? 'desktop' : 'mobile',
      modalProp,
      setModal,
    });
  }
  return (
    <>
      <Nav>
        {RecommendData.map((data, index) => (
          <Nav.Row key={index} height="200px">
            <Nav.Item
              to={data.url === params.id ? '' : data.url}
              height="200px"
              background_image={data.image}
            >
              {data.title}
            </Nav.Item>
          </Nav.Row>
        ))}
      </Nav>
    </>
  );
};

export default Recommend;
