import styled from 'styled-components';

const StyledSelect = styled.select``;

const Select = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  name: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  default?: string;
}) => {
  return <StyledSelect {...rest}>{children}</StyledSelect>;
};

export default Select;
