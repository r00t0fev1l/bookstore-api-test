import {
    stringType,
    strictObject,
    arrayOfItems,
    dateTime,
    numberType,
    exactly
} from "jest-json-schema-extended";

export const bookSchema = strictObject({
    "isbn": stringType,
    "title": stringType,
    "subTitle": stringType,
    "author": stringType,
    "publish_date": dateTime,
    "publisher": stringType,
    "pages": numberType,
    "description": stringType,
    "website": stringType
});

export const bookCollectionSchema = strictObject({
    books: arrayOfItems(bookSchema)
});

export const shortBookCollectionSchema = strictObject({
    books: arrayOfItems(strictObject({
        isbn:stringType,
    }))
});

export const isbnNotSuppliedShema = strictObject({
    code: exactly('1205'),
    message: stringType
})
