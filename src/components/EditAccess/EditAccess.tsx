import { UnlockTwoTone } from "@ant-design/icons";

import {
  notification,
  Button,
  Drawer,
  Alert,
  message,
  List,
  Input,
} from "antd";

import { drive_v3 } from "googleapis";

import React, { memo } from "react";
import Axios from "axios";

import PermissionItem from "../PermissionItem";
const EditAccess: React.FC<{ id: string }> = ({ id }) => {
  const [error, setError] = useToggle(false);
  const [permissions, setPermissions] = React.useState<
    Array<drive_v3.Schema$Permission>
  >([]);

  const [filterdPermissions, setFilterdPermissions] = React.useState<
    Array<drive_v3.Schema$PermissionList>
  >([...permissions]);

  const [open, toogle] = useToggle(false);
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    const ed = new RegExp(text, "i");
    let items: Array<drive_v3.Schema$Permission & { filterd: boolean }> = [];
    permissions.map((item: drive_v3.Schema$Permission) => {
      if (item?.emailAddress?.match(ed))
        return items.push({ ...item, filterd: true });
      else return items.push({ ...item, filterd: false });
    });
    setFilterdPermissions(items);
  }, [permissions]);

  React.useEffect(() => {
    if (open) {
      Axios({
        method: "GET",
        url: `/api/drive/permissions/list?id=${id}`,
      })
        .then(({ data }: { data: drive_v3.Schema$PermissionList }) => {
          if (!data.permissions) return;
          if (data.permissions.length === 0) return;
          setPermissions(data.permissions);
        })
        .catch((ee) => {
          ee.response.data.errors.map((e: any) => {
            notification["error"]({
              message: e.message,
            });
          });
          setError(true);
        });
    } else {
      setPermissions([]);
    }
  }, [open]);

  return (
    <>
      <Button
        type="primary"
        style={{ height: "inherit" }}
        onClick={() => toogle(true)}
      >
        <UnlockTwoTone />
        Edit Permissons
      </Button>
      <Drawer
        size="large"
        width={window?.innerWidth > 900 ? 800 : window?.innerWidth - 100}
        open={open}
        onClose={() => toogle(false)}
        destroyOnClose={true}
        footer={
          <Alert
            closable={false}
            message="Owner will not be deleted"
            type="error"
            showIcon={true}
            icon={
              <Button
                loading={permissions.length === 0 && !error}
                disabled={permissions.length === 0}
                danger
              >
                Delete All
              </Button>
            }
          />
        }
      >
        <List
          style={{ padding: "0 10px" }}
          bordered
          header={
            <Input value={text} onChange={(e) => setText(e.target.value)} />
          }
          loading={!error && permissions.length === 0}
        >
          {filterdPermissions.map((file: drive_v3.Schema$Permission) => (
            <PermissionItem data={file} fileID={id.toString()} />
          ))}
        </List>
      </Drawer>
    </>
  );
};
export default memo(EditAccess);

function useToggle(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}
