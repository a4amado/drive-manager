import { google, GoogleApis } from "googleapis";
import { IncomingMessage, OutgoingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import client from "../DB";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const authClinet = async (req: NextApiRequest|IncomingMessage, res: NextApiResponse|OutgoingMessage) => {
    const auth = new google.auth.OAuth2({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: "http://localhost:3000/api/auth/callback/google"
    });

    const accounts = await getTokens(req, res);
    auth.apiKey = process.env.DRIVE_API_KEY;
    auth.setCredentials({
        access_token: accounts[0].access_token,
        refresh_token: accounts[0].refresh_token
    })
    return auth
}

interface Account {
    refresh_token: string;
    access_token: string;
}
const getTokens = (req: NextApiRequest|IncomingMessage, res: NextApiResponse|OutgoingMessage ): Promise<Array<Account>> => {
    return new Promise(async (resolve, rej) => {
        // @ts-ignore eslint-disable-next-line
        const session = await unstable_getServerSession(req, res, authOptions);
        // @ts-ignore eslint-disable-next-line
        if (!session) rej()

        const { accounts } = await client.user.findFirst({
            where: { email: session?.user?.email },
            select: { accounts: { select: { refresh_token: true, access_token: true }, take: 1 } }
        })
        resolve(accounts);
    })

}

export default authClinet;
export { getTokens }