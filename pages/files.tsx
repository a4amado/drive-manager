import React from "react";
import Axios from "axios";
import { Col, Button, Drawer, Typography, List, Statistic, notification, Input, Select, Form, Checkbox, Modal } from "antd";
import GDQT from "search-string-for-google-drive";
import NextLink from "next/link"
const query = (params: Query_Term) => GDQT(params);
import Google, { drive_v3 } from "googleapis";
import { FolderTwoTone, FileTwoTone, UnlockTwoTone, DeleteOutlined } from "@ant-design/icons"



const Page = () => {

    const [{ files, nextPageToken }, setParams] = React.useState({
        files: [],
        nextPageToken: ''
    });


    React.useEffect(() => {
        Axios({
            url: "/api/drive/files/list",
            method: "GET"
        })
            .then(({ data }: { data: drive_v3.Schema$FileList }) => {
                setParams({
                    files: [...data.files],
                    nextPageToken: data.nextPageToken
                })
            })
    }, [])

    return <List style={{ maxWidth: "600px", width: "100%", padding: "10px 10px", display: "block", margin: "10px" }} bordered grid={{ column: 1 }} loading={files.length === 0} itemLayout={"vertical"} loadMore={<>{nextPageToken && <Button onClick={getPage}>NEXT Page</Button>}</>} dataSource={files} renderItem={(file: Folder) => {
        return <Col style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <NextLink href={`/files?id=${file.id}`}>
                <a style={{ margin: "10px 0" }}>
                    <Typography>
                        {
                            file.mimeType === "application/vnd.google-apps.folder" ? <FolderTwoTone /> : <FileTwoTone />
                        }
                        {file.name}
                    </Typography>
                </a>


            </NextLink>

            <div style={{ flex: 1 }}></div>
            <EditAccess id={file.id} />
            <AddAccess />
        </Col>
    }} />

    async function getPage() {
        Axios({
            method: "GET",
            url: `/api/drive/files/list?pageToken=${nextPageToken}`
        })
            .then(({ data }: { data: drive_v3.Schema$FileList }) => {


                setParams({ files: [...files, ...data.files], nextPageToken: data.nextPageToken });
            })
    }
};

interface Folder {
    kind: String,
    id: String,
    name: String,
    mimeType: String
}



export default Page;



interface Query_Term {
    isFolder?: Boolean,
    name?: String,
    fullText?: String,
    mimeType?: Array<String> | String,
    trashed?: false,
    starred?: true,
    parents?: String,
    owners?: String,
    readers?: String,
    writers?: String,
    sharedWithMe?: true,
    properties?: { x?: Number, y?: Number, z?: Number, when?: String },
    appProperties?: { paidInBitcoin?: Boolean },
    visibility?: String,
}

import { useToggle } from "react-use";

interface ERROR {

    domain: String;
    reason: String;
    message: String;
}

function EditAccess({ id }: { id: String }) {
    const [error, setError] = useToggle(false);
    const [permissions, setPermissions] = React.useState<Array<drive_v3.Schema$PermissionList>>([]);

    const [filterdPermissions, setFilterdPermissions] = React.useState<Array<drive_v3.Schema$PermissionList>>([...permissions]);
    React.useEffect(() => {
        setFilterdPermissions(permissions)
    }, [permissions])
    const [open, toogle] = useToggle(false);
    const [text, setText] = React.useState("");
    React.useEffect(() => {
        const ed = new RegExp(text, "i");
        let items = [];
        permissions.map((item: drive_v3.Schema$Permission) => {


            if (item?.emailAddress?.match(ed)) return items.push({ ...item, filterd: true });
            if (!item?.emailAddress?.match(ed)) return items.push({ ...item, filterd: false });

        })
        setFilterdPermissions(items);
    }, [text])

    React.useEffect(() => {
        if (open) {
            Axios({ method: "GET", url: `/api/drive/permissions/list?id=${id}` })
                .then(({ data }: { data: drive_v3.Schema$PermissionList }) => {
                    setPermissions(data.permissions);
                })
                // { data: { errors } }: { data: { errors: Array<ERROR> } }
                .catch((ee) => {
                    ee.response.data.errors.map((e) => {
                        notification["error"]({
                            message: e.message
                        })
                    })

                    setError(true)
                })
        } else {
            setPermissions([])

        }
    }, [open])

    return <>
        <Form>
            <Button type="primary" onClick={() => toogle(true)}> <UnlockTwoTone /> Edit Access</Button>
            <Drawer size="large" open={open} onClose={() => toogle(false)} footer={<Button danger>Delete All Selected</Button>}>


                <Input value={id.toString()} disabled={true} hidden={true} />
                <List
                    header={<Statistic valueRender={() => <>
                        <Typography>{permissions.length} Contributers</Typography>
                        <Input value={text} onChange={(e) => setText(e.target.value)} />
                    </>}
                        loading={permissions.length === 0} />}
                    loading={permissions.length === 0 && !error}
                    size="default"
                    dataSource={filterdPermissions}
                    renderItem={(permission: drive_v3.Schema$Permission, i) => (
                        <List.Item hidden={typeof permission.filterd === "boolean" && !permission.filterd} key={permission.id + i} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Checkbox id={permission.id} />
                            {permission.emailAddress}
                            <div style={{ flex: 1 }}></div>
                            <Button danger icon={<DeleteOutlined />} type="primary">Delete</Button>

                        </List.Item>
                    )}

                    split={true}
                    bordered
                    style={{ flex: 1 }}

                />


            </Drawer>
        </Form>
    </>
}

interface Permission {
    kind: String,
    id: String,
    type: String,
    emailAddress: String,
    role: String,
    deleted: String,
    pendingOwner: String,
}




const AddAccess = () => {
    const [open, toogle] = useToggle(false);
    return <>
        <Button onClick={() => toogle(true)}>Add</Button>
        <Modal open={open}  onCancel={() => toogle(false)}>
            <Select defaultValue="lucy">
                <Select.Option value="lucy">sss</Select.Option>
                <Select.Option>sss</Select.Option>
                <Select.Option>sss</Select.Option>
                <Select.Option>sss</Select.Option>
            </Select>
            <Input type="email" />
        </Modal>
    </>
}