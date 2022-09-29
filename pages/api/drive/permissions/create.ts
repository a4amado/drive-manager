// pages/api/hello.js
import axios from "axios";
import Google from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import GoogleClass from "../../../../Logic/Google";


const handler = nc({
    onError: (err, req: NextApiRequest, res: NextApiResponse, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {


        const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
        const pageToken = Array.isArray(req.query.pageToken) ? req.query.pageToken[0] : req.query.pageToken;

        const query: Google.drive_v3.Params$Resource$Permissions$Create = {

            fields: "*",
            requestBody: {
                emailAddress: "",
                role: "",
                type: ""
            },
            emailMessage: "Let's Dance Baby!"


        };
        if (id && pageToken) throw "Dont send fileId and pageToken together";




        const { data } = await GoogleClass.Drive_Permission_list(query, req, res);
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    }

})


export default handler;