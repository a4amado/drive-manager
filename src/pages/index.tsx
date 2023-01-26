 
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
        style={{
          background: "#1A535C",
          width: "100%",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        <img
          src="/Home_DOOR.svg"
          style={{
            width: "calc(100% - 20px)",
            maxWidth: "400px",
            margin: "auto auto",
          }}
        />

        <Form
          style={{
            width: "calc(100% - 100px)",
            margin: "auto auto"
          }}
        >
          <Form.Item
            style={{ width: "100%", margin: "0 auto", maxWidth: "300px" }}
          >
            <Button
              style={{
                background: "#fff",
                width: "100%",
                height: "100px",
                borderRadius: "10px",
                color: "#FFBA33",
                backgroundColor: "#1A535C",
              }}
              type="primary"
              onClick={() => signIn("google")}
            >
              <Typography
                style={{
                  fontSize: "23px",
                  fontFamily: "Fira Code",
                  fontWeight: "bold",
                  color: "#FFBA33",
                }}
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
