import fs from 'fs';
import config from '../config';

export function Log(message: string, level: number): number {
  //returns 1 if sucess -1 if error
  let status = 0;
  try {
    const logLing = `${(
      new Date().getTime()
    ).toString()} =${level}=> ${message}\n`;
    if (level > 1) console.log(logLing);
    fs.appendFileSync(config.logFile, logLing);
    status = 1;
  } catch (error) {
    status = -1;
    console.error(error)
  }
  return status;
}
