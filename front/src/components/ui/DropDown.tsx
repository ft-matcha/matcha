import { cloneElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const DetailStyle = styled.details`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SummaryStyle = styled.summary`
  display: flex;
  z-index: 1000;
  height: 100%;
  max-height: 100%;
  margin: 0;
  padding: auto;
  font-size: 0px;
  margin: 0 auto;
  ::marker {
    font-size: 0px;
  }
  svg {
    font-size: 32px;
  }
  div::-webkit-details-marker {
    content: '';
    list-style: none;
    display: none;
  }
`;

const DetailDropDownStyle = styled.div`
  z-index: 1000;
  position: absolute;
  display: flex;
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
  const [open, setOpen] = useState(false);

  return (
    <SummaryStyle
      onClick={() => {
        console.log('switch');
        setOpen((prev) => !prev);
      }}
    >
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
    <DetailStyle ref={ref}>
      <DropDownButton openElement={openElement} closeElement={closeElement} />
      <DetailDropDownStyle>{children}</DetailDropDownStyle>
    </DetailStyle>
  );
};

export default DropDown;
