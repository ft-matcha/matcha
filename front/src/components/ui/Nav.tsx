import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface NavProps {
  borderRight?: string;
  height?: string;
  background?: string;
  children?: React.ReactNode;
  float?: string;
}

const NavContainer = styled.nav<NavProps>`
  gap: 10px;
  border-right: ${({ borderRight }) => (borderRight ? borderRight + 'solid gray' : '0px')};
  min-width: 325px;
  background: ${({ background, theme }) => (background ? background : theme.background)};
  color: ${({ theme }) => theme.color};
  max-width: 375px;
  line-height: normal;
  height: auto;
`;

const NavRow = styled.section<NavProps>`
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${({ float }) => (float ? float : 'start')};
  align-items: center;
  gap: 10px;
  height: ${({ height }) => (height ? height : '40px')};
  background: ${({ background }) => (background ? background : 'transparent')};
`;

const NavItem = styled(NavLink)<NavProps>`
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  border-radius: 5px;
  text-align: center;
  align-items: center;
  .active {
    background: ${({ theme }) => theme.backgroundHover};
  }
  &:hover {
    background: ${({ theme }) => theme.backgroundHover};
  }
`;

const NavSection = styled.section<NavProps>`
  display: flex;
  flex-direction: row wrap;
  height: auto;
  border-top: 1px solid;
  width: 100%;
  overflow: scroll;
  object-fit: contain;
  scrollbar-width: none;

  &:: -webkit-scrollbar {
    display: none;
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
  Section: NavSection,
});
