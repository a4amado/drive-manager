// pages/api/hello.js
import axios from "axios";
import Google from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import GoogleClass from "../../../Logic/Google";

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
    const emailAddress = Array.isArray(req.query.emailAddress)
      ? req.query.emailAddress[0]
      : req.query.emailAddress;
    const query: Google.drive_v3.Params$Resource$Files$List = {
      pageSize: 50,
      fields: "*",
      q: "'a4addel@gmail.com' in writers or 'a4addel@gmail.com' in readers or 'a4addel@gmail.com' in owners",
    };

    const { data } = await GoogleClass.Drive_Files_list(query, req, res);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default handler;
