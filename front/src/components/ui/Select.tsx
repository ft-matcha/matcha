import styled from 'styled-components';

const StyledSelect = styled.select``;

const Select = ({
  children,
  name,
  id,
  onChange,
}: {
  children: React.ReactNode;
  name: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <StyledSelect name={name} id={id} onChange={onChange}>
      {children}
    </StyledSelect>
  );
};

export default Select;
