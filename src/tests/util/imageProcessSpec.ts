import path from 'path';
import { resize } from '../../util/image_handler';
import config from '../../config';

describe('image Processing', () => {
  let data: boolean;
  let data2: boolean;
  beforeAll(async () => {
    data = await resize(
      path.join(config.assetsFolder, '/full', 'fjord.jpg'),
      path.join(config.assetsFolder, '/thump', 'fjord200x200.jpg'),
      200,
      200
    );
    data2 = await resize(
      path.join(config.assetsFolder, '/full', 'invalid.jpg'),
      path.join(config.assetsFolder, '/thump', 'invalid200x200.jpg'),
      200,
      200
    );
  });
  it('Image resize should return true', () => {
    expect(data).toBeTrue();
  });
  it('error handling, should return false to invalid image', () => {
    expect(data2).toBeFalse();
  });
});
