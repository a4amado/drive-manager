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

      <Layout className="h-screen w-full  overflow-hidden bg-sky-900">
        <img
          src="/Homepage_DOOR.svg"
          className="w-[calc(100% - 20px)] m-auto max-w-md"
        />

        <Form className="w-[calc(100% - 100px)] m-auto max-w-md">
          <Form.Item className="mx-0 my-auto w-full max-w-xs">
            <Button
              className="h-full w-full rounded bg-sky-800 text-yellow-300 "
              type="primary"
              onClick={() => signIn("google")}
            >
              <Typography className="text-xl font-bold text-yellow-300">
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
