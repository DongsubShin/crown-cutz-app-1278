"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require("supertest");
const app_module_1 = require("../../src/app.module");
describe('AuthController (e2e)', () => {
    let app;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe());
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    describe('POST /auth/login', () => {
        it('should return 401 for invalid credentials', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({ email: 'wrong@crowncutz.com', password: 'wrongpassword' })
                .expect(401);
        });
        it('should return 400 for missing fields', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({ email: 'admin@crowncutz.com' })
                .expect(400);
        });
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map