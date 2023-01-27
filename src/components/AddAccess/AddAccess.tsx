import {
  notification,
  Button,
  Modal,
  Form,
  Select,
  Input,
  Typography,
} from "antd";
import Axios, { AxiosError } from "axios";
import React, { memo } from "react";
import { useToggle } from "react-use";
import * as Roles from "../../../public/roles.json";

function AddAccess({ id }: { id: String }) {
  const [open, toogle] = useToggle(false);
  const [loading, toogleLoading] = useToggle(false);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [role, setRole] = React.useState("reader");
  function CreatePermission(e: React.FormEvent) {
    e.preventDefault();
    toogleLoading(true);
    Axios({
      method: "POST",
      url: `/api/drive/permissions/create?emailAddress=${emailAddress}&role=${role}&fileID=${id}`,
    })
      .then(() => {
        setEmailAddress("");
        setRole("");
        notification["success"]({
          message: "Permission Assigned Succesfully",
        });

        toogleLoading(false);
        toogle(false);
      })
      .catch((err: AxiosError) => {
        // @ts-ignore
        err?.response?.data?.errors.map((error) => {
          notification["error"]({
            message: error?.message || "Something weng wrong",
          });
        });
        toogleLoading(false);
      });
  }
  return (
    <>
      <Button style={{ height: "inherit" }} onClick={() => toogle(true)}>
        Add User
      </Button>
      <Modal open={open} onCancel={() => toogle(false)}>
        <Form>
          <form onSubmit={CreatePermission}>
            <Form.Item>
              <label>User Type</label>
              <Select defaultValue="reader" value={role} onChange={setRole}>
                {Roles.map((f) => (
                  <Select.Option key={f.value} value={f.value}>
                    {f.lable}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <label>Email</label>

              <Input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </Form.Item>
            <Button onClick={CreatePermission} loading={loading}>
              Add
            </Button>
          </form>
        </Form>

        <Typography>
          set {emailAddress} as {role}
        </Typography>
      </Modal>
    </>
  );
}

export default memo(AddAccess);
