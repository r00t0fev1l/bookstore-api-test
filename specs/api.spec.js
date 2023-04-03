import config from "../framework/config";
import user from "../framework/services";

let userId = null;
describe('bookstore', () => {

    test('Create User', async () => {
        const res = await user.createUser(config.credentials);
        userId = res.body.userID;

        expect(res.status).toEqual(201);
    })

    test('User already exists', async () => {
        const res = await user.createUser(config.credentials);

        expect(res.body.code).toEqual("1204");
    })

    test('Generate token', async () => {
        const res = await user.generateToken(config.credentials);
        //console.log(res.body);

        expect(res.status).toEqual(200);
    })

    test('User is authorized', async () => {
        const res = await user.authorize(config.credentials);

        expect(res.body).toEqual(true);
    })


    test('Get user info', async () => {
        const res = await user.getUser(userId);
        //console.log(res, userId);
        expect(res.body.username).toEqual(config.credentials.userName);
    })

    test('Delete user', async () => {
        const res = await user.deleteUser(userId);
        //console.log(res.body);

        //Фактически при отдаче 204 статуса удаление проходит, потому что при следующем запуске юзер создается
        expect(res.status).toEqual(204);
    })

})