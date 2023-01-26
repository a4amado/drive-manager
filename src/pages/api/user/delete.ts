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

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
});

export default handler;
