import * as GoogleApi from "googleapis";
import { NextApiRequest, NextApiResponse } from "next/types";
import { IncomingMessage, OutgoingMessage } from "node:http";
import { getTokens } from "../Config/AuthClient";



class Google {
    private authClient: GoogleApi.Auth.AuthClient;
    private driveObj: GoogleApi.drive_v3.Drive;
    private auth(req: NextApiRequest | IncomingMessage, res: NextApiResponse | OutgoingMessage): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.authClient) return resolve(this.authClient)
                const authObject = await getTokens(req, res);

                const authClient = new GoogleApi.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "http://localhost:3000/api/auth/callback/google")
                authClient.setCredentials({
                    access_token: authObject[0].access_token,
                    refresh_token: authObject[0].refresh_token
                });
                authClient.apiKey = process.env.DRIVE_API_KEY;
                this.authClient = authClient;
                
                return resolve(authClient)
            } catch (error) {
                return reject(error)
            }
        })
    };

    private setUP_drive(req: NextApiRequest | IncomingMessage, res: NextApiResponse | OutgoingMessage): Promise<GoogleApi.drive_v3.Drive> {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.driveObj) return resolve(this.driveObj)
                const auth = await this.auth(req, res)
                const drive = GoogleApi.google.drive({ version: "v3", auth: auth })
                
                this.driveObj = drive;
                return resolve(drive);
            } catch (error) {
                return reject(error);
            }
        })
    };

    async Drive_Files_list(query: GoogleApi.drive_v3.Params$Resource$Files$List, req: NextApiRequest | IncomingMessage, res: NextApiResponse | OutgoingMessage) {
        const files = await this.setUP_drive(req, res);
        const gg = await files.files.list(query)
        return gg
    };

    async Drive_Permission_list(query: GoogleApi.drive_v3.Params$Resource$Files$List, req: NextApiRequest | IncomingMessage, res: NextApiResponse | OutgoingMessage) {
        const files = await this.setUP_drive(req, res);
        const gg = await files.permissions.list(query)
        return gg
    };


}
const GoogleClass = new Google();

export default GoogleClass;