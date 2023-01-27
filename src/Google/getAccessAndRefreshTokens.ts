import { IncomingMessage, OutgoingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";

import client from "../DB";

async function getAccesAndRefreshTokens(
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | OutgoingMessage
): Promise<{ refresh_token: string; access_token: string } | boolean> {
  // @ts-ignore eslint-disable-next-line
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) return false;

  const accounts = await client.user.findFirst({
    where: { email: session?.user?.email },
    select: {
      accounts: {
        select: { refresh_token: true, access_token: true },
        take: 1,
      },
    },
  });

  // If account or access_token or refresh_token does not exist
  if (
    !accounts?.accounts[0] ||
    accounts?.accounts[0].access_token ||
    accounts?.accounts[0].refresh_token
  )
    return false;

  const tokens = {
    access_token: accounts?.accounts[0].access_token || "",
    refresh_token: accounts?.accounts[0].refresh_token || "",
  };

  return tokens;
}

export default getAccesAndRefreshTokens;
