import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface NavProps {
  height?: string;
  background?: string;
  children?: React.ReactNode;
  float?: string;
}

const NavContainer = styled.nav<NavProps>`
  display: flex;
  gap: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  min-width: 325px;
  background: ${({ background, theme }) => (background ? background : theme.background)};
  color: ${({ theme }) => theme.color};
  max-width: 375px;
  line-height: 100px;
  height: 100px;
`;

const NavRow = styled.section<NavProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${({ float }) => (float ? float : 'start')};
  overflow: hidden;
  align-items: center;
  gap: 10px;
  height: ${({ height }) => (height ? height : '40px')};
  background: ${({ background }) => (background ? background : 'transparent')};
`;

const NavItem = styled(NavLink)<NavProps>`
  width: fit-content;
  max-width: 50%;
  text-ellipse: ellipsis;
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  border-radius: 5px;
  text-align: start;
  align-items: center;
  .active {
    background: ${({ theme }) => theme.backgroundHover};
  }
  &:hover {
    background: ${({ theme }) => theme.backgroundHover};
  }
`;

const NavButton = styled(NavItem).attrs({ as: 'button' })``;

const Nav: React.FC<NavProps> = ({ children, ...rest }) => {
  return <NavContainer {...rest}>{children}</NavContainer>;
};

export default Object.assign(Nav, {
  Item: NavItem,
  Row: NavRow,
  Button: NavButton,
});
