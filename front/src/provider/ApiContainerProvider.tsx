import App from '@/App';
import { ApiCall, ApiContainer } from '@/api/api';
import axios from 'axios';
import React from 'react';
import ModalProvider from '@/provider/ModalProvider';
import ThemeProvider from '@/provider/ThemeProvider';
import { Api } from '@/api/api-types';
import { CookiesProvider } from 'react-cookie';
import useApi from '@/hooks/useApi';

const apiInstanceObject: Record<string, any> = {
  loginApi: (apiInstance: Api.ApiInstance, baseUrl: string) => new ApiCall(apiInstance, baseUrl),
  registerApi: (apiInstance: Api.ApiInstance, baseUrl: string) => new ApiCall(apiInstance, baseUrl),
  signupApi: (apiInstance: Api.ApiInstance, baseUrl: string) => new ApiCall(apiInstance, baseUrl),
  profileApi: (apiInstance: Api.ApiInstance, baseUrl: string) => new ApiCall(apiInstance, baseUrl),
  userApi: (apiInstance: Api.ApiInstance, baseUrl: string) => new ApiCall(apiInstance, baseUrl),
};

const apiContainer = new ApiContainer({
  apiInstance: axios,
  apiInstanceObject: apiInstanceObject,
});
export const ApiContainers = React.createContext<ApiContainer>(apiContainer);

export const ApiProvider = () => {
  return (
    <CookiesProvider>
      <ApiContainers.Provider value={apiContainer}>
        <ThemeProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ThemeProvider>
      </ApiContainers.Provider>
    </CookiesProvider>
  );
};
