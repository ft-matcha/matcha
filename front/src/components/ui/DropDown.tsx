import { RefObject, cloneElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const DetailStyle = styled.details`
  width: 100%;
  height: 100%;
  position: relative;
  summary::-webkit-details-marker {
    display: inline-block;
    font-size: 0px;
  }
`;

const SummaryStyle = styled.summary`
  z-index: 1000;
  padding: 5px;
  display: flex;
  height: fit-content;
  margin: 0;
  padding: auto;
  margin: 0 auto;
  svg {
    font-size: 32px;
  }
`;

const DetailDropDownStyle = styled.div`
  z-index: 1000;
  position: absolute;
  display: block;
  top: 78px;
  right: 3px;
  width: 400px;
  min-height: 150px;
  border: 1px solid ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
  @media screen and max-width: 768px {
    width: 268px;
  }
`;

const DropDownButton = ({
  openElement,
  closeElement,
}: {
  openElement: React.ReactNode;
  closeElement: React.ReactNode;
}) => {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (ref.current === null) return;
    const DetailDropDownEvent = () => {
      const parentRef = ref.current?.parentNode as HTMLElement;
      const parentOpen = parentRef.getAttribute('open');
      if (open && parentOpen === null) {
        parentRef.setAttribute('open', '');
      } else if (!open && parentOpen !== null) {
        parentRef.removeAttribute('open');
      }
    };
    DetailDropDownEvent();
  }, [open]);

  const onClick = (e: React.MouseEvent) => {
    setOpen((prev) => !prev);
  };
  return (
    <SummaryStyle ref={ref} onClick={onClick}>
      {open ? openElement : closeElement}
    </SummaryStyle>
  );
};

const DropDown = ({
  openElement,
  closeElement,
  children,
}: {
  openElement: React.ReactNode;
  closeElement: React.ReactNode;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDetailsElement>(null);

  return (
    <DetailStyle ref={ref} onClick={(e) => e.preventDefault()}>
      <DropDownButton openElement={openElement} closeElement={closeElement} />
      <DetailDropDownStyle>{children}</DetailDropDownStyle>
    </DetailStyle>
  );
};

export default DropDown;
