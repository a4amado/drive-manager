import "../styles/index.css";
import "antd/dist/antd.css";
import "nprogress/nprogress.css";

import React from "react";
import { SessionProvider } from "next-auth/react";
import NProgress from "nprogress";
import Router from "next/router";
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
  return (
    <SessionProvider session={pageProps?.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
