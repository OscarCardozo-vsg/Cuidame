import { Request,Response } from "express";
import multer from "multer";
import path from "path";
import{SQL_MASCOTA} from "../../repositories/mascota/mascotaRepo";
import mascotasDao from "../../dao/mascota/mascotasDao";

// Logica para guardar la imagen en la carpeta uploads
// Cambia el nombre del archivo por una secuencia de números aleatorio
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/uploads');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
const upload = multer({ storage: storage }).single('foto_path');

class ControladorMascotas extends mascotasDao{

    // Controler para obtener la información de todas las mascotas
    public getMascotas(req: Request, res: Response): void {
        const sqlMascotaListarTodos = SQL_MASCOTA.LISTAR_TODOS;
        ControladorMascotas.listarTodos(sqlMascotaListarTodos, [], res)
    }
   
    // Controler para obtener la información de una mascota a traves del id
    public getMascotaPorId(req: Request, res: Response): void {
       const id = req.params.id;
       const sqlListarId = SQL_MASCOTA.LISTAR_POR_ID;
       ControladorMascotas.listarPorId(sqlListarId, id, res);
    }

    // Controler para obtener la información del dueño de una mascota a traves del id del usuario
    // Los datos obtenidos son:
    //  - nombre
    //  - correo
    //  - telefono
    public getUsuarioMascota(req: Request, res: Response): void {
        const idUsuario = req.params.id;
        const sqlListarId = SQL_MASCOTA.OBTENER_USUARIO;
        ControladorMascotas.obtenerUsuario(sqlListarId, idUsuario, res);
    }

    // Controler para crear una mascota nueva
    // Los datos necesarios son:
    //  nombre, foto_path, sexo, especie, raza, fecha_nacimiento, chip, descripcion, estado, id_usuario
    public postMascota(req: Request, res: Response): void {
        upload(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: "Error al subir la imagen" });
            }

            const { nombre, sexo, especie, raza, fecha_nacimiento, chip, descripcion, id_usuario } = req.body;
            const foto_path = req.file ? req.file.filename : null;
            const estado = true

            const datos = [nombre, foto_path, sexo, especie, raza, fecha_nacimiento, chip, descripcion, estado, id_usuario];
            ControladorMascotas.crearMascota(SQL_MASCOTA.CREAR, datos, res);
        });
    }

    // Controler para eliminar una mascota usando su id
    public deletMascota(req:Request,res:Response): void{
        const codigo = req.params.id;
        const parametro = [codigo];
        ControladorMascotas.borrarPorId(SQL_MASCOTA.ELIMINAR, parametro, res);
    }

    // Controler para crear una mascota nueva
    // Los datos necesarios son:
    // id_mascota, nombre, foto_path, sexo, especie, raza, fecha_nacimiento, chip, descripcion, estado, id_usuario
    // El id_usuario no es solicitado en la vista
    public putMascota(req: Request, res: Response): void {
        upload(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: "Error al subir la imagen" });
            }
    
            const { id_mascota, nombre, sexo, especie, raza, fecha_nacimiento, chip, descripcion, id_usuario, foto_path: foto_path_string } = req.body;
    
            const foto_path = req.file 
            ? req.file.filename 
            : (typeof foto_path_string === 'string' && foto_path_string.length > 0) ? foto_path_string : null;  
    
            if (!foto_path) {
                return res.status(400).json({ error: "Se requiere una foto válida." });
            }
    
            const datos = [id_mascota, nombre, foto_path, sexo, especie, raza, fecha_nacimiento, chip, descripcion, id_usuario];
            ControladorMascotas.editarMascota(SQL_MASCOTA.EDITAR, datos, res);
        });
    }
    
}

const ControlMascotas = new ControladorMascotas();
export default ControlMascotas;