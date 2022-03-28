import { Log, MiddleWareLogger } from './util/logger';
import { resize } from './util/image_handler';

import express from 'express';
import fs from 'fs';
import { readdir } from 'fs/promises';
import config from './config';
import path from 'path';
const app = express();
const port = 3000 || process.env.PORT;

app.use(MiddleWareLogger);

app.get(
  '/serve/:filename',
  async (req: express.Request, resp: express.Response): Promise<void> => {
    // server image file
    try {
      // check for the existance of the filename ,width and height parameters
      const { filename } = req.params; //implicit types aren't any
      const { width, height } = req.query;
      const parsedWidth: number = parseInt(width as string);
      const parsedHeight: number = parseInt(height as string);
      const dimensionsProvided =
        !isNaN(parsedWidth) &&
        !isNaN(parsedHeight) &&
        parsedWidth > 0 &&
        parsedWidth < 10000 &&
        parsedHeight > 0 &&
        parsedHeight < 10000;
      if (filename == undefined) {
        resp.status(404).json({
          success: false,
          message: 'malformed input! missing filename',
        });
        return;
      }

      Log(
        `filename: ${filename}, width: ${width}, height: ${height}, from IP: ${req.ip}`
      );
      // make sure those inputs are safe (unpolluted)
      const imagePath: string = path.join(
        config.assetsFolder,
        '/thump',
        `${filename.split('.')[0]}${width}x${height}.${filename.split('.')[1]}`
      );
      // check for the existance of the required image file
      const imageExists: boolean = fs.existsSync(imagePath);
      // if not exists
      if (!imageExists) {
        //check for image in full
        const originalImagePath: string = path.join(
          config.assetsFolder,
          '/full',
          filename
        );
        const imageExistsinFull: boolean = fs.existsSync(originalImagePath);
        // if not
        // return image not found
        if (!imageExistsinFull) {
          resp.status(404).json({ success: false, message: 'file not found!' });
          return;
        }
        if (!dimensionsProvided) {
          return resp.status(200).sendFile(path.resolve(originalImagePath));
        }

        if (!fs.existsSync(path.join(config.assetsFolder, '/thump'))) {
          fs.mkdirSync(path.join(config.assetsFolder, '/thump'));
        }

        //https://github.com/lovell/sharp#examples // gotten from the examples with some edits.
        //    create new image file with required params.
        const ImageProcessed = await resize(
          originalImagePath,
          imagePath,
          parsedWidth,
          parsedHeight
        );
        if (!ImageProcessed) {
          resp
            .status(500)
            .json({ success: false, message: 'error proccess the image' });
          return;
        }

        Log(`Image ${filename} ${width}x${height} at ${imagePath} `);
        resp.status(200).sendFile(path.resolve(imagePath));
        return;
      }
      return resp.status(200).sendFile(path.resolve(imagePath));
      // serve image content
    } catch (e) {
      Log(e);
      resp
        .status(500)
        .json({ success: false, message: 'internal server Error' });
      return;
    }
  }
);

app.get(
  '/gallery',
  async (req: express.Request, resp: express.Response): Promise<void> => {
    // shows all images in the folders
    //read all files names from full and thump
    try {
      if (!fs.existsSync(path.join(config.assetsFolder, '/thump'))) {
        fs.mkdirSync(path.join(config.assetsFolder, '/thump'));
      }

      let files: string[] = await readdir(
        path.join(config.assetsFolder, 'full')
      );
      const filesThump: string[] = await readdir(
        path.join(config.assetsFolder, 'thump')
      );
      files = [...files, ...filesThump];

      const result: string[] = files.map((file: string) => `/serve/${file}`);
      Log<Array<string>>(result);

      resp.status(200).json({
        success: true,
        message: 'images listed succesfully',
        data: result,
      });
    } catch (e) {
      Log(e as string);
      resp
        .status(500)
        .json({ success: false, message: 'internal server Error' });
      return;
    }
  }
);

app.listen(port, () => {
  Log(`Server started on port ${port}`);
});

export default app;
