import { Log } from './util/logger';

import express from 'express';
const app = express();
const port = 3000 || process.env.PORT;

app.get('/server', (req: express.Request, resp: express.Response):void => {// server image file

});
app.get('/gallery', (req: express.Request, resp: express.Response): void => {// shows all images in the folders
  
});

app.listen(port, () => {
  Log(`Server started on port ${port}`);
});
