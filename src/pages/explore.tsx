import React from "react";
import Axios, { AxiosError } from "axios";
import { Col, List, Row, Button, Typography, notification } from "antd";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { drive_v3 } from "googleapis";
import GoogleClass, { queryDrive } from "../Logic/Google";
import { authOptions } from "./api/auth/[...nextauth]";

import FileItem from "../components/FileItem";

import { unstable_getServerSession } from "next-auth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const id = Array.isArray(ctx.query.id) ? ctx.query.id[0] : ctx.query.id;
  const pageToken = Array.isArray(ctx.query.pageToken)
    ? ctx.query.pageToken[0]
    : ctx.query.pageToken;

  const query: drive_v3.Params$Resource$Files$List = {
    pageSize: 50,
    fields: `files(mimeType, name, id, webViewLink), nextPageToken`,
  };

  if (!pageToken)
    query.q = queryDrive({
      parents: !!id ? id : "root",
    });
  else if (pageToken) query.pageToken = pageToken;

  // SETUP_CLIENT

  try {
    const data = await GoogleClass.listFiles(query, ctx.req, ctx.res);

    return {
      props: {
        data: data?.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        data: {
          files: [],
        },
        error: JSON.stringify(error),
      },
    };
  }
};

const Page: React.FC<{ data: drive_v3.Schema$FileList }> = ({ data }) => {
  const Router = useRouter();
  const [files, setParams] = React.useState<drive_v3.Schema$FileList>(data);

  async function getPage() {
    try {
      const NewFiles = await Axios({
        method: "GET",
        url: `/api/drive/files/list?pageToken=${files.nextPageToken}`,
      });

      // @ts-ignore
      setParams({
        files: [...(files.files || []), ...NewFiles.data.files],
        nextPageToken: NewFiles.data.nextPageToken,
        incompleteSearch: NewFiles.data.incompleteSearch,
        kind: NewFiles.data.kind,
      });
    } catch (error) {}
  }

  React.useEffect(() => {
    if (data?.files?.length === 0) {
      notification["error"]({
        message:
          "Maybe the file has been deleted or you dont have permission to see it's content",
      });
      setParams({
        files: [],
        nextPageToken: "",
      });
    }
    setParams(data);
  }, [Router]);

  return (
    <Row className="mx-auto my-5 flex flex-col">
      <Typography className="align-center w-full p-3 text-center text-4xl font-bold">
        Drive Manager
      </Typography>
      <List
        className="mx-auto my-0 w-full max-w-3xl gap-2 p-1"
        dataSource={files.files}
        grid={{ column: 1 }}
        renderItem={(item: drive_v3.Schema$File, i) => (
          <FileItem data={item} i={i} />
        )}
        bordered
        loadMore={
          files.nextPageToken && (
            <Col className="w-full items-center justify-center">
              <Button onClick={getPage}>LoadMore</Button>
            </Col>
          )
        }
        loading={files.files?.length === 0}
      />
    </Row>
  );
};

export default Page;
