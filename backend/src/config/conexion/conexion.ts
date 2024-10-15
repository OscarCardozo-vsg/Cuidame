import pgPromise from "pg-promise";
import {opcionesPG} from "./opcionConexion";
import variablesConexion from "../dominios/varDB";

const pgp = pgPromise(opcionesPG);
const pool = pgp(variablesConexion); 
const dbname = variablesConexion.database;

pool.connect().then((conn)=>{
    console.log(
        "Conexion exitosa",
        dbname
    );
    conn.done();
    
}).catch((mierror)=>{
    console.log(mierror);
});

export default pool;
