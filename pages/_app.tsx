import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import React from "react";
import { SessionProvider } from "next-auth/react"

const MyApp = ({ Component, pageProps }: any) => {
    return <SessionProvider session={pageProps?.session}> <Component {...pageProps}/></SessionProvider>
};



export default MyApp;