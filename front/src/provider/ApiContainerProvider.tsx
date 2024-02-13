import App from '@/App';
import { ApiContainer, LoginApi, RegisterApi } from '@/api/api';
import axios from 'axios';
import React from 'react';
import ModalProvider from '@/provider/ModalProvider';
import ThemeProvider from '@/provider/ThemeProvider';
import { Api } from '@/api/api-types';

const apiInstanceObject: Record<string, any> = {
  loginApi: (apiInstance: Api.ApiInstance, baseUrl: string) => new LoginApi(apiInstance, baseUrl),
  registerApi: (apiInstance: Api.ApiInstance, baseUrl: string) =>
    new RegisterApi(apiInstance, baseUrl),
};

const apiContainer = new ApiContainer(axios, apiInstanceObject);

export const ApiContainers = React.createContext<ApiContainer>(apiContainer);

export const ApiProvider = () => {
  return (
    <>
      <ApiContainers.Provider value={apiContainer}>
        <ThemeProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ThemeProvider>
      </ApiContainers.Provider>
    </>
  );
};
