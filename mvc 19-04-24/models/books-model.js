const fs = require("fs")
const path = "./db 19-04-24./db.json"


function createFile(data) {
    const dataJSON = JSON.stringify(data)
    fs.writeFileSync(path, dataJSON)
}

function readFile() {
    const booksJSON = fs.readFileSync(path, { encoding: "utf-8" });
    const booksJs = JSON.parse(booksJSON)

    return booksJs
}

module.exports = {
    createFile: createFile,
    readFile: readFile,
}