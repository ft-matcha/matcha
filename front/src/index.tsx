import App from '@/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApiContainer } from './api/api';
import axios from 'axios';
import { ApiProvider } from './provider/ApiContainerProvider';
import { RouterProvider } from 'react-router-dom';
import routes from '@/router/routes';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
a{
    text-decoration: none;
    color: inherit;
}
*{
    box-sizing: border-box;
}
html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
a, dl, dt, dd, ol, ul, li, form, label, table{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 10px;
  vertical-align: baseline;
}
html {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
body{
  line-height: 1;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #F6F9F0;
  margin-bottom: 100px;
  min-height: 100%;
  min-width: 100%;
}
ol, ul{
  list-style: none;
}
button {
  border: 0;
  background: transparent;
  cursor: pointer;
}

#root {
  height: 100vh;
}
`;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={routes} />
  </React.StrictMode>,
);
