"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
describe('GET /gallery:', () => {
    let data;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        data = yield (0, supertest_1.default)(index_1.default).get('/gallery');
        // console.log(data.body.data)
    }));
    it('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(data.status).toEqual(200);
    }));
    it('should return JSON array', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Array.isArray(data.body.data)).toBeTruthy();
    }));
});
describe('GET /serve/', () => {
    describe('correct image, no width or height', () => __awaiter(void 0, void 0, void 0, function* () {
        let data;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            data = yield (0, supertest_1.default)(index_1.default).get('/serve/fjord.jpg');
            console.log(data.headers);
        }));
        it('responds with image content', () => {
            expect(data.headers['content-type']).toEqual('image/jpeg');
        });
    }));
    describe('correct image, width and height', () => __awaiter(void 0, void 0, void 0, function* () {
        let data;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            data = yield (0, supertest_1.default)(index_1.default).get('/serve/fjord.jpg?width=100&height=100');
            // console.log(data.headers)
        }));
        it('responds with image content', () => {
            expect(data.headers['content-type']).toEqual('image/jpeg');
        });
    }));
    describe('invalid image', () => __awaiter(void 0, void 0, void 0, function* () {
        let data;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            data = yield (0, supertest_1.default)(index_1.default).get('/serve/invalid.jpg');
            console.log(data.body);
        }));
        it('should respond success false', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(data.body.success).toBeFalse();
        }));
        it('should respond message file not found', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(data.body.message).toEqual('file not found!');
        }));
    }));
    describe('correct image, width and height but are outside of range', () => __awaiter(void 0, void 0, void 0, function* () {
        let data;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            data = yield (0, supertest_1.default)(index_1.default).get('/serve/fjord.jpg?width=10000&height=10000');
            // console.log(data.headers)
        }));
        it('responds with image content', () => {
            expect(data.headers['content-type']).toEqual('image/jpeg');
        });
    }));
    // describe("correct image, no width or height", async ()=> {
    // })
});
