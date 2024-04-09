import styled from 'styled-components';

const StyledLabel = styled.label`
  for: ${({ htmlFor }) => htmlFor};
  font-size: 13px;
`;

const Label = ({ htmlFor, children }: { htmlFor: string; children?: React.ReactNode }) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

export default Label;
