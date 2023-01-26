// pages/api/hello.js
import axios from "axios";
import { log } from "console";
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
    const email = Array.isArray(req.query.emailAddress)
      ? req.query.emailAddress[0]
      : req.query.emailAddress;
    const role = Array.isArray(req.query.role)
      ? req.query.role[0]
      : req.query.role;
    const fileID = Array.isArray(req.query.fileID)
      ? req.query.fileID[0]
      : req.query.fileID;

    const query: Google.drive_v3.Params$Resource$Permissions$Create = {
      fields: "*",
      requestBody: {
        emailAddress: email,
        role: role,
        type: "user",
      },
      emailMessage: "Let's Dance Baby!",
      fileId: fileID,
    };

    const { data } = await GoogleClass.Drive_Permissions_Create(
      query,
      req,
      res
    );
    res.send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
});

export default handler;
