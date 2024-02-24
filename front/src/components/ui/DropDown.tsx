import { useRef, useState } from 'react';
import styled from 'styled-components';

const DetailDropDownStyle = styled.div`
  position: absolute;
  display: flex;
  top: 78px;
  right: 3px;
  width: 400px;
  min-height: 150px;
  border: 1px solid;
  z-index: 1000;
  @media screen and max-width: 768px {
    width: 268px;
  }
`;

const DetailStyle = styled.details`
  position: relative;
  ${DetailDropDownStyle} {
    z-index: 1000;
    background: rgba(255, 255, 255, 255);
    border: 1px solid black;
    color: black;
    &:hover {
      display: flex;
      border: 1px solid black;
      color: black;
    }
    li {
      font-size: 16px;
      gap: 3px;
    }
  }
`;

const SummaryStyle = styled.summary`
  ::marker {
    content: '';
  }
  list-style: none;
  &:hover {
    cursor: pointer;
  }
`;

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
  const [open, setOpen] = useState(false);

  return (
    <DetailStyle {...ref}>
      <SummaryStyle onClick={() => setOpen((prev) => !prev)}>
        {open ? openElement : closeElement}
      </SummaryStyle>
      <DetailDropDownStyle>{children}</DetailDropDownStyle>
    </DetailStyle>
  );
};

export default DropDown;
