import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface NavProps {
  borderRight?: string;
  height?: string;
  background?: string;
  children?: React.ReactNode;
  float?: string;
  width?: string;
  background_image?: string;
  overflow_y?: string;
  aspect_ratio?: string;
}

const NavContainer = styled.nav<NavProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: 100%;
  border-right: ${({ borderRight }) => (borderRight ? borderRight + 'solid gray' : '0px')};
  min-width: 325px;
  background: ${({ background, theme }) => (background ? background : theme.background)};
  color: ${({ theme }) => theme.color};
  overflow-y: ${({ overflow_y }) => (overflow_y ? overflow_y : 'auto')};
  max-width: 375px;
  line-height: normal;
  @media screen and (max-width: 768px) {
    max-width: none;
    height: auto;
  }
`;

const NavRow = styled.section<NavProps>`
  text-align: center;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: ${({ float }) => (float ? float : 'start')};
  background: ${({ background, theme }) => (background ? background : theme.background)};
  align-items: center;
  gap: 10px;
  height: ${({ height }) => (height ? height : '40px')};
  aspect_ratio: ${({ aspect_ratio }) => (aspect_ratio ? aspect_ratio : 'auto')};
`;

const NavList = styled.div<NavProps>`
  width: fit-content;
  display: flex;
  flex-direction: row;
`;

const NavItem = styled(NavLink)<NavProps>`
  display: flex;
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '40px')};
  line-height: 40px;
  font-size: 22px;
  border-radius: 5px;
  text-align: center;
  align-items: center;
  gap: 3px;
  background-size: cover;
  background-image: ${({ background_image }) => (background_image ? background_image : 'none')};
  .active {
    background: ${({ theme }) => theme.backgroundHover};
  }
  &:hover {
    background: ${({ theme }) => theme.backgroundHover};
  }
`;

const NavSection = styled.section<NavProps>`
  display: flex;
  flex-flow: row wrap;
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
  List: NavList,
  Section: NavSection,
});
