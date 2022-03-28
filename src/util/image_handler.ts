import sharp from 'sharp';
import { Log } from './logger';
export async function resize(
  ImagePath: string,
  TargetPath: string,
  width: number,
  height: number
): Promise<boolean> {
  let returnValue = false;
  try {
    await sharp(ImagePath).resize(width, height).toFile(TargetPath);
    Log(`Image ${ImagePath} ${width}x${height} at ${TargetPath} `);
    returnValue = true;
  } catch (e) {
    Log(e);
    returnValue = false;
  }
  return returnValue;
}
