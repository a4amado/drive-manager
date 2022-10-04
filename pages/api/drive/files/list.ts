// pages/api/hello.js
import { drive_v3 } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import Google, { queryDrive } from "../../../../Logic/Google";

const handler = nc({
  onError: (err, req: NextApiRequest, res: NextApiResponse) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  }
});



handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    const isId = !!id;
    const pageToken = Array.isArray(req.query.pageToken)
      ? req.query.pageToken[0]
      : req.query.pageToken;

    
    
    if (id && pageToken) throw "Dont send fileId and pageToken together";
    const query: drive_v3.Params$Resource$Files$List = {
      pageSize: 50,
      fields: `files(mimeType, name, id, webViewLink, iconLink), nextPageToken`,
    };

    if (id)
      query.q = queryDrive({
        parents: !!id ? id : "root",
      });
    else if (pageToken) query.pageToken = pageToken;


    const { data } = await Google.Drive_Files_list(query, req, res);
    return res.send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
});

export default handler;