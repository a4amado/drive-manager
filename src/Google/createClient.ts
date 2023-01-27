import { IncomingMessage, OutgoingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";

import GoogleUserClient from "./createGoogleUserClient";
import getAccesAndRefreshTokens from "./getAccessAndRefreshTokens";

const createClinet = async (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | OutgoingMessage
) => {
  const tokens = await getAccesAndRefreshTokens(req, res);
  console.log(tokens);

  if (typeof tokens != "object") throw "Not Auth";

  const { client } = new GoogleUserClient();

  client.apiKey = process.env.DRIVE_API_KEY;
  client.setCredentials({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  });
  return client;
};

export default createClinet;
