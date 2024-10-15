import {config} from "dotenv";
config({path:"./.env"});

export default {
    // usuario de la base de datos
    user : process.env.DB_USER || "user_node",
    // contraseña del usuario
    // TODO: encriptar la contraseña
    password: process.env.DB_PASSWORD || "0000",
    host: process.env.DB_HOST || "localhost",
    // Puerto por donde corre la bd, cambiar según sea el caso
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || "cuidame"
}