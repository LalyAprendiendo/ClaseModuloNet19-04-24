const net = require("net")

// LOGICA PARA CREAR UNA CONEXION AL SERVIDOR
const client = new net.createConnection({ port: 3000 })

// LA CALLBACK QUE SE ENVÍA CÓMO SEGUNDO PARÁMETRO AL MÉTODO ON SE VA A EJECUTAR --EXCLUSIVAMENTE-- CUANDO EL CLIENTE SE CONECTE AL SERVIDOR
client.on("connect", () => {
    const book = {
        id: "2",
        name: "libro JSON 2",
        author: "Javascript",
        tags: [
            "Drama",
        ],
        sold: 1
    }

    const data = { action: "create", body: book }
    // const data = { action: "read" }
    // const data = { action: "readOne", body: { id: 0 } }
    // const data = { action: "modify", body: book }
    // const data = { action: "delete", body: book.id }

    const message = JSON.stringify(data)

    // ENVÍO EL MENSAJE AL SERVIDOR
    client.write(message)
})

// LA CALLBACK QUE SE LE PASA AL EVENTO DATA SE VA A EJECTUAR EXCLUSIVAMENTE CUANDO EL SERVER ENVÍE UN MENSAJE A NUESTRO CLIENTE 
client.on("data", (mensajeServer) => {
    console.log(JSON.parse(mensajeServer));
})