import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import { Amplify } from "aws-amplify";
import { StoreProvider } from "easy-peasy";
import store from "./config/store.ts";
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import MainPage from "./pages/MainPage.tsx";

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: import.meta.env.VITE_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: import.meta.env.VITE_USERPOOLID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: import.meta.env.VITE_USERPOOLWEBCLIENTID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
  },
});
const StoreProviderOverride = StoreProvider as any;




ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <StoreProviderOverride store={store}>
     <BrowserRouter>
      <Routes>
      {['/', 'new-request', 'request-history'].map(path => <Route key={path} path={path} element={<App />} />)}
      <Route path="/login" element={<Login />} />
      </Routes>
     </BrowserRouter>
    </StoreProviderOverride>
  </>
);
