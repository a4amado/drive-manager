import { SettingFilled, FileFilled, FolderTwoTone } from "@ant-design/icons";
import { Col, Dropdown, Menu, Row, Typography } from "antd";
import { drive_v3 } from "googleapis";
import { memo } from "react";
import { useToggle } from "react-use";
import EditAccess from "../EditAccess";
import NextLink from "next/link";
import AddAccess from "../AddAccess";

function FileItem({ data, i }: { data: drive_v3.Schema$File; i: number }) {
  const [hover, setHover] = useToggle(false);
  const isFolder = data.mimeType === "application/vnd.google-apps.folder";

  // @ts-ignore
  return (
    <Col
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        maxWidth: "800px",
        background: `${i % 2 === 0 ? "rgba(0,0,0,0.1)" : ""}`,
        height: "40px",
        gap: "10px",
      }}
      key={data.id}
    >
      <Dropdown
        placement="topLeft"
        trigger={["click"]}
        overlay={
          <Menu
            items={[
              {
                label: (
                  <a target="_blank" href={data.webViewLink || ""}>
                    Open
                  </a>
                ),
                key: "0",
              },
              {
                label: <EditAccess id={data.id || ""} />,
                key: "1",
              },
              {
                label: <AddAccess id={data.id || ""} />,
                key: "2",
              },
            ]}
          />
        }
      >
        <Row
          className="pointer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "55px",
            background: "rgba(0,0,0,0.1)",
          }}
        >
          <SettingFilled className="text-xl hover:cursor-pointer" />
        </Row>
      </Dropdown>
      {!isFolder && (
        <Typography
          style={{
            height: "inherit",
            flex: 1,
            alignContent: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FileFilled style={{ fontSize: "20px", margin: "0 10px" }} />
          <Typography
            style={{
              width: "100%",
              overflow: "hidden",
              fontSize: "13px",
              textOverflow: "ellipsis",
            }}
          >
            {data.name}
          </Typography>
        </Typography>
      )}
      {isFolder && (
        <Typography
          style={{
            height: "inherit",
            flex: 1,
            alignContent: "center",
            display: "flex",
          }}
        >
          <NextLink href={`/explore?id=${data.id}`}>
            <a
              style={{
                margin: "10px 0",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FolderTwoTone
                style={{
                  fontSize: "20px",
                  margin: "0 10px",
                }}
              />
              <Typography
                style={{
                  width: "100%",
                  overflow: "hidden",
                  fontSize: "13px",
                  textOverflow: "ellipsis",
                }}
              >
                {data.name}
              </Typography>
            </a>
          </NextLink>
        </Typography>
      )}
    </Col>
  );
}

export default memo(FileItem);
