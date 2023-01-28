import * as GoogleApi from "googleapis";
import { NextApiRequest, NextApiResponse } from "next/types";
import { IncomingMessage, OutgoingMessage } from "node:http";
import setUpClient from "../Google/setUpClient";

async function listPermissions(
  query: GoogleApi.drive_v3.Params$Resource$Permissions$List,
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | OutgoingMessage
) {
  const client = await setUpClient(req, res);
  if (!client) return null;
  const gg = await client.permissions.list(query);
  return gg;
}

async function getDriveId(
  query: GoogleApi.drive_v3.Params$Resource$About$Get,
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | OutgoingMessage
) {
  const client = await setUpClient(req, res);
  if (!client) return null;
  const gg = await client.files.get({ fileId: "root", fields: "id" });
  return gg;
}

async function listFiles(
  query: GoogleApi.drive_v3.Params$Resource$Files$List,
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | OutgoingMessage
) {
  const client = await setUpClient(req, res);
  if (!client) return null;
  const gg = await client.files.list(query);
  return gg;
}

async function Drive_Permission_list(
  query: GoogleApi.drive_v3.Params$Resource$Files$List,
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | OutgoingMessage
) {
  const client = await setUpClient(req, res);
  if (!client) return null;
  const gg = await client.permissions.list(query);
  return gg;
}

async function getFile(
  query: GoogleApi.drive_v3.Params$Resource$Files$Get,
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | OutgoingMessage
) {
  const client = await setUpClient(req, res);
  if (!client) return null;
  const gg = await client.files.get(query);
  return gg;
}
async function createPermissions(
  query: GoogleApi.drive_v3.Params$Resource$Permissions$Create,
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | OutgoingMessage
) {
  const client = await setUpClient(req, res);
  if (!client) return null;
  const gg = await client.permissions.create(query);
  return gg;
}
async function deletePermissions(
  query: GoogleApi.drive_v3.Params$Resource$Permissions$Delete,
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | OutgoingMessage
) {
  const client = await setUpClient(req, res);
  if (!client) return null;
  const gg = await client.permissions.delete(query);
  return gg;
}

export default {
  listPermissions,
  getDriveId,
  listFiles,
  deletePermissions,
  createPermissions,
  getFile,
};

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
