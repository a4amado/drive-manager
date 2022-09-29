import React from "react";
import { Layout, Row, AutoComplete } from "antd"
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";



const MyApp = () => {
    const [options, setOptions] = React.useState([]);
    const [text, setText] = React.useState("");
    return <Layout style={{ display: "flex", flexDirection: "column", justifyContent: "stretch", height: "100vh" }}>
        <Row style={{ flex: 1, width: "100%", maxWidth: "800px", margin: "0 auto", flexDirection: "column" }}>
            <Row style={{ width: "100%", height: "80px" }}>
                <AutoComplete
                    style={{ width: "100%" }}
                    onSearch={() => setOptions([...options, "s"])}

                >
                {
                    options.map((e) => {
                        return <AutoComplete.Option>sss</AutoComplete.Option>
                    })
                }
                </AutoComplete>
            </Row>

        </Row>
        <Row style={{ flex: 0, height: "50px" }}>sss</Row>

    </Layout>
};



export default MyApp;