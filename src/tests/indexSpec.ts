import request from 'supertest';
import app from '../index';

describe('GET /gallery:', () => {
  let data: request.Response;
  beforeAll(async () => {
    data = await request(app).get('/gallery');
    // console.log(data.body.data)
  });

  it('should return 200 OK', async () => {
    expect(data.status).toEqual(200);
  });

  it('should return JSON array', async () => {
    expect(Array.isArray(data.body.data)).toBeTruthy();
  });
});

describe('GET /serve/', () => {
  describe('correct image, no width or height', async () => {
    let data: request.Response;
    beforeAll(async () => {
      data = await request(app).get('/serve/fjord.jpg');
      console.log(data.headers);
    });
    it('responds with image content', () => {
      expect(data.headers['content-type']).toEqual('image/jpeg');
    });
  });
  describe('correct image, width and height', async () => {
    let data: request.Response;
    beforeAll(async () => {
      data = await request(app).get('/serve/fjord.jpg?width=100&height=100');
      // console.log(data.headers)
    });
    it('responds with image content', () => {
      expect(data.headers['content-type']).toEqual('image/jpeg');
    });
  });
  describe('invalid image', async () => {
    let data: request.Response;
    beforeAll(async () => {
      data = await request(app).get('/serve/invalid.jpg');
    //   console.log(data.body);
    });
    it('should respond success false', async () => {
      expect(data.body.success).toBeFalse();
    });
    it('should respond message file not found', async () => {
      expect(data.body.message).toEqual('file not found!');
    });
  });
  describe('correct image, width and height but are outside of range', async () => {
    let data: request.Response;
    beforeAll(async () => {
      data = await request(app).get('/serve/fjord.jpg?width=10000&height=10000');
      // console.log(data.headers)
    });
    it('responds with image content', () => {
      expect(data.headers['content-type']).toEqual('image/jpeg');
    });
  });
  // describe("correct image, no width or height", async ()=> {

  // })
});
