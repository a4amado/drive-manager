
import React from "react";
import { Button, Form, Layout, Typography } from "antd";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";


import { motion, AnimationProps } from "framer-motion";




const Animation = (props: AnimationProps) => props;




export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  if (session)
    return {
      redirect: {
        destination: "/explore",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

const MyApp = () => {
  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" href="/disable_body_scroll.css" />
      </Head>

      <Layout
        className="bg-sky-900 w-full  h-screen overflow-hidden"

      >
        <img
          src="/Homepage_DOOR.svg"
          className="w-[calc(100% - 20px)] max-w-md m-auto"

        />

        <Form
          className="w-[calc(100% - 100px)] max-w-md m-auto"

        >
          <Form.Item
            className="w-full mx-0 my-auto max-w-xs"
            
          >
            <Button
            className="bg-sky-800 w-full h-full rounded text-yellow-300 "
              
              type="primary"
              onClick={() => signIn("google")}
            >
              <Typography
              className="text-xl font-bold text-yellow-300"
                
              >
                Connect to Drive
              </Typography>
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </React.Fragment>
  );
};

export default MyApp;
