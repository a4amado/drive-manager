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

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const fileID = Array.isArray(req.query.fileID)
      ? req.query.fileID[0]
      : req.query.fileID;
    const permissionId = Array.isArray(req.query.permissionId)
      ? req.query.permissionId[0]
      : req.query.permissionId;

    const query: Google.drive_v3.Params$Resource$Permissions$Delete = {
      fields: "*",
      fileId: fileID,
      permissionId: permissionId,
    };

    const { data } = await GoogleClass.Drive_Permissions_Delete(
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
