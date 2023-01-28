// pages/api/hello.js
import { drive_v3 } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import Google, { queryDrive } from "../../../../Logic/Google";

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

    const query: drive_v3.Params$Resource$Files$List = {
      pageSize: 50,
      fields: `files(mimeType, name, id, webViewLink, iconLink), nextPageToken`,
      q: queryDrive({
        readers: emailAddress,
      }),
    };

    // SETUP_CLIENT

    const data = await Google.listFiles(query, req, res);
    return res.send(data?.data);
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
});

export default handler;
