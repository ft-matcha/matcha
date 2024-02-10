import styled from 'styled-components';
import React, { ReactNode } from 'react';
import { CardProps } from '@/types';

export const CardHeader = styled.div<CardProps>`
  height: 60px;
`;
export const CardFooter = styled.div<CardProps>`
  height: 60px;
  padding: 10px 5px 10px 5px;
`;
export const CardBody = styled.div<CardProps>`
  min-height: 300px;
  height: fit-content;
  padding: 10px 5px 10px 5px;
  border-bottom: 1px solid;
`;

const CardComponents = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (width ? width : '100%')};
  border-radius: ${(props) => props.borderRadius};
  margin: -1px 0 0 -1px;
  border: 1px solid;
  min-height: 420px;
  min-width: 280px;
  height: fit-content;
  @media screen and (max-width: 480px) {
    width: 100%;
    max-width: 100%;
  }
`;

const Card: React.FC<CardProps> = ({ children, ...rest }) => {
  return <CardComponents {...rest}>{children}</CardComponents>;
};

export default Card;
