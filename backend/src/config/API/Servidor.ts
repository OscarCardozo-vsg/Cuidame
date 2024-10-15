import express from "express";
import cors from 'cors';
import { config } from "dotenv";
import morgan from "morgan";
import mascotaRutas from "../../routes/mascotaRutas";
import path from "path";

class Servidor{

    public app: express.Application;
    public port: String;   

    constructor(){
        this.app = express();
        config({path:"./.env"});
        // Por defecto corre en el puerto 8082, cambiar según sea el caso
        this.port= process.env.SERVER_PORT||"8082";
        this.iniciarConfig();
        this.activarRutas();
    }

    public iniciarConfig():void{
        this.app.set("PORT",this.port);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({ limit: "100mb" }));
        this.app.use(express.urlencoded({ extended: true }));
    }
    //Define las rutas por la cual puede consumir la API:
    // /cuidame: GET, GETBYID, POST, PUT, DELETE
    // /uploads: solicita las imagenes guardadas en la carpeta uploads
    public activarRutas(): void {
      this.app.use("/cuidame", mascotaRutas);
      const uploadsPath = path.join(__dirname, '../../uploads');
      this.app.use('/uploads', express.static(uploadsPath));
      }
      public arrancar(): void {
        const puerto=this.app.get("PORT")
        this.app.listen(puerto, () => {
          console.log("Servidor corriendo en http://localhost:" + puerto);
        });
      }
}

export default Servidor;
