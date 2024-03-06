import CardList from '@/components/CardList';
import ReactDOM, { createPortal } from 'react-dom';
import { Link, useParams, useOutletContext, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RecommendResult, { RecommendTest } from '@/page/recommend/RecommendResult';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '@/provider/ModalProvider';
import Nav from '@/components/ui/Nav';
import { ModalContextProps } from '@/types';
import portalWrapper from '@/utils/portalWrapper';

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

const RecommendModal = ({ id }: { id: string | undefined }) => {
  const navigator = useNavigate();
  const { modalProp, setModal } = useContext(ModalContext);

  useEffect(() => {
    if (!id) {
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModal({ modalType: '', toggle: false });
        navigator('/recommend');
      }
    };
    setModal({ modalType: 'recommendModal', toggle: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [id]);
  useEffect(() => {
    if (modalProp.toggle === false) {
      navigator('/recommend');
    }
  }, [modalProp]);
  return <></>;
};

const Recommend = () => {
  const { id } = useParams();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (document.body.clientWidth > 768) {
        mobile && setMobile(() => false);
      } else {
        !mobile && setMobile(() => true);
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  useEffect(() => {
    console.log('render');
  }, [mobile, document.getElementById('main')]);

  return (
    <>
      <Nav>
        {RecommendData.map((data, index) => (
          <Nav.Row key={index} height="200px">
            <Nav.Item
              to={data.url === id ? '' : data.url}
              height="200px"
              background_image={data.image}
            >
              {data.title}
            </Nav.Item>
          </Nav.Row>
        ))}
      </Nav>
      {!mobile
        ? portalWrapper(<RecommendTest />, document.getElementById('main') as Element)
        : null}
      <RecommendModal id={id} />
    </>
  );
};

export default Recommend;
