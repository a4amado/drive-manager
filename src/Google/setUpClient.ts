import * as GoogleApi from "googleapis";
import { IncomingMessage, OutgoingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import createClient from "./createClient";

async function setUpClient(req: NextApiRequest | IncomingMessage, res: NextApiResponse | OutgoingMessage): Promise<GoogleApi.drive_v3.Drive | null> {
    try {
        const auth = await createClient(req, res);
        const drive = GoogleApi.google.drive({ version: "v3", auth: auth })
        return drive
    } catch (error) {
        return null
    }

}
export default setUpClient;