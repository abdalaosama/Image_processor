import { Log } from './util/logger';

import express from 'express';
import * as fs from 'fs/promises';
import config from './config';
import path from 'path';
const app = express();
const port = 3000 || process.env.PORT;

app.get('/serve', (req: express.Request, resp: express.Response):void => {// server image file
    // check for the existance of the filename ,width and height parameters
    // make sure those inputs are safe (unpolluted)
    // check for the existance of the required image file
    // if not exists 
    //    create new image file with required params.
    // serve image content 
});
app.get('/gallery', async (req: express.Request, resp: express.Response) => {// shows all images in the folders
  //read all files names from full and thump
  try{
        let files: string[] = await fs.readdir(path.join(config.assetsFolder, "full"))
    
        let result: string[] = files.map((file: string) => `/serve/${file}`)
        Log<Array<string>>(result)
        
        resp.status(200).json({success:true, message:"images listed succesfully", data: result})
  }catch(e){
      Log(e as string)
      return resp.status(500).json({success:false, message:"internal server Error"})
  }
});

app.listen(port, () => {
  Log(`Server started on port ${port}`);
});
