import { ReactNode } from 'react';
import { ThemeProvider as STheme } from 'styled-components';

const theme = {
  lightTheme: {
    background: 'white',
    backgroundOpacity: 'rgba(255, 255, 255, 1)',
    backgroundHover: 'rgba(100, 100, 100, 1)',
    color: 'black',
    colorHover: 'white',
  },
  darkTheme: {
    background: 'black',
    backgroundOpacity: 'rgba(0, 0, 0, 1)',
    backgroundHover: 'rgba(100, 100, 100, 1)',
    color: 'white',
    colorHover: 'black',
  },
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <STheme theme={theme.darkTheme}>{children}</STheme>;
};

export default ThemeProvider;
