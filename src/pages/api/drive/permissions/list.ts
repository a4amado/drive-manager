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

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    const pageToken = Array.isArray(req.query.pageToken)
      ? req.query.pageToken[0]
      : req.query.pageToken;

    const query: Google.drive_v3.Params$Resource$Permissions$List = {
      pageSize: 50,
      fields: "*",
    };
    if (id && pageToken) throw "Dont send fileId and pageToken together";

    if (id) query.fileId = id;
    else if (pageToken) query.pageToken = pageToken;

    const data = await GoogleClass.listPermissions(query, req, res);
    res.send(data?.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default handler;
