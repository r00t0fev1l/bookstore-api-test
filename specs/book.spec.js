import config from "../framework/config";
import user from "../framework/services";
import {
    bookCollectionSchema,
    bookSchema,
    isbnNotSuppliedShema,
    shortBookCollectionSchema
} from "../framework/book.schema";
import {expectToMatchSchema, setup} from "jest-json-schema-extended";
let userId = null;
let bearer = null;
setup()

describe('Book API', () => {

    beforeAll(async () => {
        const res = await user.createUser(config.credentials);
        await user.generateToken(config.credentials);
        userId = res.body.userID;
    })

    afterAll(async() => {
        await user.deleteUser(userId);
    })

    test('Book collection is not empty', async () => {
        const res = await user.getBooks();
        expect(res.body.books?.length).toBeGreaterThan(0)
        expectToMatchSchema(res.body, bookCollectionSchema)
    })

    test( 'Add Books', async () => {
        const collectionOfIsbns = ["9781449325862", "9781449331818", "9781449337711"].map(value => ({isbn: value}))
        const res = await user.addBooks(collectionOfIsbns, userId, bearer);
        expect(res.body.books?.length).toEqual(3)
        expectToMatchSchema(res.body, shortBookCollectionSchema)
    })

    describe.each(["9781449325862", "9781449331818", "9781449337711"])("Get book info", (isbn) => {
        test(`Get info ${isbn}`, async () => {
            const res = await user.getBook(isbn);
            expect(res.body.isbn).toEqual(isbn)
            expectToMatchSchema(res.body, bookSchema)
        })
    })

    test.each( 'Replace Book', async () => {
        const res = await user.replaceBook("9781449325862", "9781593275846", userId);
        expect(res.body.books?.length).toEqual(3)
        expectToMatchSchema(res.body, bookSchema)
    })

    test( 'Replace with unexisted book', async () => {
        const res = await user.replaceBook("9781449325862", "1111111111111", userId);
        expect(res.body.code).toEqual("1205")
        expectToMatchSchema(res.body, isbnNotSuppliedShema)
    })

    describe.each(["9781449325862", "9781449331818", "9781449337711"])("Delete ISBN", (isbn) => {
        test(`Delete ${isbn}`, async () => {
            const res = await user.deleteBook(isbn, userId);
            expect(res.status).toEqual(204);
        })
    })

})