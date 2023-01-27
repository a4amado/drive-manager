import * as GoogleApi from "googleapis";
import { NextApiRequest, NextApiResponse } from "next/types";
import { IncomingMessage, OutgoingMessage } from "node:http";

import createClient from "../Google/createClient";

class Google {
  setUP_drive(
    req: NextApiRequest | IncomingMessage,
    res: NextApiResponse | OutgoingMessage
  ): Promise<GoogleApi.drive_v3.Drive> {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await createClient(req, res);
        const drive = GoogleApi.google.drive({ version: "v3", auth: auth });

        return resolve(drive);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async Drive_Drives_list(
    query: GoogleApi.drive_v3.Params$Resource$Drives$List,
    req: NextApiRequest | IncomingMessage,
    res: NextApiResponse | OutgoingMessage
  ) {
    const files = await this.setUP_drive(req, res);
    const gg = await files.drives.list(query);
    return gg;
  }

  async Drive_Permissions_List(
    query: GoogleApi.drive_v3.Params$Resource$Permissions$List,
    req: NextApiRequest | IncomingMessage,
    res: NextApiResponse | OutgoingMessage
  ) {
    const files = await this.setUP_drive(req, res);
    const gg = await files.files.list(query);
    return gg;
  }

  async Drive_Get_Drive_Id(
    query: GoogleApi.drive_v3.Params$Resource$About$Get,
    req: NextApiRequest | IncomingMessage,
    res: NextApiResponse | OutgoingMessage
  ) {
    const files = await this.setUP_drive(req, res);
    const gg = await files.files.get({ fileId: "root", fields: "id" });
    return gg;
  }

  async Drive_Files_list(
    query: GoogleApi.drive_v3.Params$Resource$Files$List,
    req: NextApiRequest | IncomingMessage,
    res: NextApiResponse | OutgoingMessage
  ) {
    const files = await this.setUP_drive(req, res);
    const gg = await files.files.list(query);
    return gg;
  }

  async Drive_Permission_list(
    query: GoogleApi.drive_v3.Params$Resource$Files$List,
    req: NextApiRequest | IncomingMessage,
    res: NextApiResponse | OutgoingMessage
  ) {
    const files = await this.setUP_drive(req, res);
    const gg = await files.permissions.list(query);
    return gg;
  }

  async Drive_file_get(
    query: GoogleApi.drive_v3.Params$Resource$Files$Get,
    req: NextApiRequest | IncomingMessage,
    res: NextApiResponse | OutgoingMessage
  ) {
    const files = await this.setUP_drive(req, res);
    const gg = await files.files.get(query);
    return gg;
  }
  async Drive_Permissions_Create(
    query: GoogleApi.drive_v3.Params$Resource$Permissions$Create,
    req: NextApiRequest | IncomingMessage,
    res: NextApiResponse | OutgoingMessage
  ) {
    const files = await this.setUP_drive(req, res);
    const gg = await files.permissions.create(query);
    return gg;
  }
  async Drive_Permissions_Delete(
    query: GoogleApi.drive_v3.Params$Resource$Permissions$Delete,
    req: NextApiRequest | IncomingMessage,
    res: NextApiResponse | OutgoingMessage
  ) {
    const files = await this.setUP_drive(req, res);
    const gg = await files.permissions.delete(query);
    return gg;
  }
}
const GoogleClass = new Google();

export default GoogleClass;

interface Query_Term {
  isFolder?: Boolean;
  name?: String;
  fullText?: String;
  mimeType?: Array<String> | String;
  trashed?: false;
  starred?: true;
  parents?: String;
  owners?: String;
  readers?: String;
  writers?: String;
  sharedWithMe?: true;
  properties?: { x?: Number; y?: Number; z?: Number; when?: String };
  appProperties?: { paidInBitcoin?: Boolean };
  visibility?: String;
}

// @ts-ignore
import GDQT from "search-string-for-google-drive";

const queryDrive = (params: Query_Term) => GDQT(params);

export { queryDrive };
