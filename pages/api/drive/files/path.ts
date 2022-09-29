// pages/api/hello.js
import { drive_v3, google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import Google from "../../../../Logic/Google";




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

    const path = [];
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    
    const query: drive_v3.Params$Resource$Files$Get = {
        fields:  `*`, 
        fileId: id
    };
  
 


    // SETUP_CLIENT
    
    const data = await Google.Drive_file_get(query, req, res);
    return res.send(data);
  } catch (error) {
    console.log(error);
    
    res.status(500).send(error);
  }

})


export default handler;


