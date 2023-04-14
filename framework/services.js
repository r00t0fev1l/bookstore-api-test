import supertest from "supertest";
import config from "../framework/config";

const {url} = config;
//контроллер user

let token = new Buffer(config.credentials.userName + ":" + config.credentials.password).toString("base64");
const user = {

    authorize: (payload) => {
        const request = supertest(url)
            .post('/Account/v1/Authorized')
            .set('Accept', 'application/json')
            .send();

        if (token) {
            request.set('Authorization', `Basic ${token}`)
        }

        return request.send(payload);
    },

    createUser: (payload) => {
        return supertest(url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send(payload)
    },

    deleteUser: (payload) => {
        const request = supertest(url)
            .delete('/Account/v1/User/' + payload)
            .set('Accept', 'application/json')

        if (token) {
            request.set('Authorization', `Basic ${token}`)
        }

        return request.send();
    },

    getUser: (payload) => {
        const request = supertest(url)
            .get('/Account/v1/User/' + payload)
            .set('Accept', 'application/json');

        if (token) {
            request.set('Authorization', `Basic ${token}`)
        }

        return request.send();
    },

    generateToken: (payload) => {
        const request = supertest(url)
            .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')

        if (token) {
            request.set('Authorization', `Basic ${token}`)
        }

        return request.send(payload);
    },

    addBooks: (collectionOfIsbns, userId, bearer) => {
        const request = supertest(url)
            .post('/Bookstore/v1/Books')
            .set('Accept', 'application/json')

        if (token) {
            request.set('Authorization', `Basic ${token}`)
        }

        return request.send({
                userId,
                collectionOfIsbns,
            },
        );
    },

    deleteBook: (isbn, userId) => {
        const request = supertest(url)
            .delete('/BookStore/v1/Book')
            .set('Accept', 'application/json')

        if (token) {
            request.set('Authorization', `Basic ${token}`)
        }

        return request.send({
                userId,
                isbn
            },
        );
    },

    replaceBook: (isbn, newIsbn, userId) => {
        const request = supertest(url)
            .put('/BookStore/v1/Books/' + isbn)
            .set('Accept', 'application/json')

        if (token) {
            request.set('Authorization', `Basic ${token}`)
        }

        return request.send({
                userId,
                isbn: newIsbn
            },
        );
    },

    getBooks: () => {
        const request = supertest(url)
            .get('/Bookstore/v1/Books/')
            .set('Accept', 'application/json')

        if (token) {
            request.set('Authorization', `Basic ${token}`)
        }

        return request.send();
    },

    getBook: (isbn) => {
        const request = supertest(url)
            .get('/Bookstore/v1/Book?ISBN=' +isbn)
            .set('Accept', 'application/json')

        if (token) {
            request.set('Authorization', `Basic ${token}`)
        }

        return request.send();
    },


}


export default user