const fs = require("fs")
const booksmodel = require("../models/books-model.js")


function validateBook(book) {

    // if (data.id && data.name && data.author && data.tags && (data.sold || data.sold == 0)) {
    //     if (typeof data.id == "number") {
    //         const dataJSON = JSON.stringify(data)
    //         fs.writeFileSync(path, dataJSON)
    //     } else {
    //         return "ID tiene que ser tipo NUMBER"
    //     }
    // } else {
    //     return "Faltan propiedades"
    // }


    if (!book.id || !book.name || !book.author || !book.tags.length || !book.sold && book.sold != 0) { // verifico que NO me falte alguna propiedad necesaria para crear el libro
        return "Propiedades faltantes"
    }

    if (typeof book.id != "number") { // Verifico que el ID que me pasan sea de tipo numerico
        return "ID tiene que ser tipo NUMBER"
    }

    const books = readFile()

    const searchedBbook = books.find((book) => book.id == book.id)

    // Chequeo si existe algun libro con el ID indicado por el cliente, y retorno un error en caso que ya exista
    if (searchedBbook) {
        return "ERROR: el ID ya existe"
    }

    return true // Retorno TRUE en caso que haya pasado todas las validaciones
}

function addBook(book) {
    const isValidBook = validateBook(book) // Llamo al validador

    if (typeof isValidBook == "string") { // Verifico que si la validacion devolvió un string, significa que HAY un ERROR.
        return isValidBook
    }

    const books = readFile()

    books.push(book)

    createFile(books)

    return "CREADO!"
}

function findById(id) {
    const books = readFile()

    const searchedBook = books.find((book) => book.id === id) // find devuelve el libro si lo encuentra o undefined caso contrario

    if (!searchedBook) {
        return "No existe el libro"
    }
    return searchedBook
}

module.exports = {
    readFile: readFile,
    addBook: addBook,
    findById: findById,
}