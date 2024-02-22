import { useRef } from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  width: 100%;
  display: block;
  font-size: 22px;
  border: 1px solid;
  padding: 5px 0px 0px 5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Span: React.FC<any> = ({ value, ...rest }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <StyledSpan ref={ref} {...rest}>
      {value}
    </StyledSpan>
  );
};

export default Span;
