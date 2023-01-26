import "../styles/index.css";
import "antd/dist/antd.css";
import "nprogress/nprogress.css";
import { Suspense } from "react";
import React from "react";
import { SessionProvider } from "next-auth/react";
import NProgress from "nprogress";
import Router from "next/router";
import Axios from "axios";
NProgress.configure({
  showSpinner: true,
});
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

const MyApp = ({ Component, pageProps }: any) => {
  React.useEffect(() => {
    Axios.defaults.headers["Cache-Control"] = "no-cache";
    Axios.defaults.headers["Pragma"] = "no-cache";
    Axios.defaults.headers["Expires"] = "0";
  }, [Router]);


  
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <SessionProvider session={pageProps?.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Suspense>
  );
};

export default MyApp;
