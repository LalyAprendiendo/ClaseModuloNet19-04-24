const net = require("net")
const fs = require("fs")
const booksController = require ("./controllers/books-controller")

// LOGICA PARA CREAR UN SERVIDOR
const server = net.createServer()

const port = 3000
const callback = () => {
    console.log("SERVIDOR ESCUCHANDO EN EL PUERTO " + port);
}






function processArguments(mensaje) {
    // EL MENSAJE TIENE LA SIGUIENTE FORMA:
    // { action: "", body: {} }
    // la propiedad "action" hace referencia a lo que quiere hacer: leer, crear, eliminar, modificar
    // En la propiedad "body" es donde el cliente va a enviar informacion que se va a guardar en la base de datos (es decir, cuando quiera crear un libro, modificarlo)
    const data = JSON.parse(mensaje)

    if (!data.action) {
        return "No me mandaste ninguna accion"
    }

    // VERIFICO SI LA ACCION ES READ (OBTENER TODOS LOS LIBROS) Y HAGO ALGO EN CONSECUENCIA
    if (data.action == "read") {
        return readFile()

    } else if (data.action == "create") { // VERIFICO SI LA ACCION ES CREATE (CREAR LIBRO) Y HAGO ALGO EN CONSECUENCIA
        // fs.writeFileSync("./db/db.json", data.body)
        if (!fs.existsSync(path)) {
            createFile([])
        }

        return addBook(data.body)
    }
    else if (data.action == "readOne") { // VERIFICO SI LA ACCION ES readOne (BUSCAR UN LIBRO POR ID) Y HAGO ALGO EN CONSECUENCIA
        const book = findById(data.body.id)

        return book
    } else {
        return "Accion invalida"
    }
}

// LA CALLBACK QUE SE ENVÍA CÓMO SEGUNDO PARÁMETRO AL MÉTODO ON SE VA A EJECUTAR --EXCLUSIVAMENTE-- CUANDO UN CLIENTE SE CONECTE A NUESTRO SERVIDOR

server.on("connection", (clienteConectado) => {
    console.log("Se conecto un cliente");

    // LA CALLBACK QUE SE LE PASA AL EVENTO DATA SE VA A EJECTUAR EXCLUSIVAMENTE CUANDO EL CLIENTE ENVÍE UN MENSAJE A NUESTRO SERVIDOR
    clienteConectado.on("data", (mensajeCliente) => {
        // TRANSFORMO EL MENSAJE DEL CLIENTE(BUFFER ==> STRING)
        const mensajeTexto = mensajeCliente.toString();

        // VERIFICO EL MENSAJE DEL CLIENTE PARA VER QUE ACCIÓN VOY A REALIZAR
        const datoAEnviarJs = processArguments(mensajeTexto)
        const datoAEnviarJson = JSON.stringify(datoAEnviarJs)

        // ENVÍO LA INFORMACIÓN AL CLIENTE
        clienteConectado.write(datoAEnviarJson)
    })
})

// LEVANTO EL SERVIDOR EN EL PUERTO ESPECIFICADO Y EJECUTO LA CALLBACK CUANDO SE HAYA LEVANTADO CORRECTAMENTE
server.listen(port, callback)
