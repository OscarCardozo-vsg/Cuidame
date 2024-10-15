import { Request,Response } from "express";
import pool from "../../config/conexion/conexion";

class mascotasDao{

    protected static async listarTodos( SQL_MASCOTA:string, parametros:any, res:Response) : 
    Promise<any>{
        pool.result(SQL_MASCOTA,parametros).then((obj) => {
            console.log("=>"+obj.rows);
            res.status(200).json({ Mensaje: "Mascotas: " , mascotas:obj.rows });
        }).catch((error) => {
          console.log("Error listando las alcaldias", error);
          res.status(400).json({
            respuesta: "Error listando todos",
          });
        });
    }

    protected static async listarPorId( sql_listId:string, id:any, res:Response ) : 
    Promise<any>{
      await pool.one(sql_listId,id).then((respuesta) => {
          console.log("=>"+respuesta);
          return res.status(200).json({ Mensaje: "Se encontro segun el id " , responde:respuesta, id: id });
      })
      .catch((error) => {
        console.log("=>", error);
        res.status(400).json({
          respuesta: "Error, no hay informacion asociada a ese ID",
          id: id,
        });
      });
    }

    protected static async obtenerUsuario( sql_listId:string, idUsuario:any, res:Response ) : 
    Promise<any>{
      await pool.one(sql_listId,idUsuario).then((respuesta) => {
          console.log("=>"+respuesta);
          return res.status(200).json({ Mensaje: "Se encontro segun el id " , responde:respuesta, id: idUsuario });
      })
      .catch((error) => {
        console.log("=>", error);
        res.status(400).json({
          respuesta: "Error, no hay informacion asociada a ese ID",
          id: idUsuario,
        });
      });
    }

    protected static async crearMascota(sqlCrear: string, params: any, res: Response): 
    Promise<any> {
        await pool.task(async (consulta) => {
            return await consulta.one(sqlCrear, params);
        })
        .then((respuesta) => {
            res.status(200).json({
                mensaje: "Mascota creada",
                nuevoCodigo: respuesta.id_mascota
            });
        })
        .catch((error) => {
            console.log("Error ", error);
            res.status(400).json({
                respuesta: "Mascota no creada",
            });
        });
    }

    protected static async borrarPorId(sqlBorrar: string, params: any, res:Response) : 
    Promise<any>{
        await pool
            .result( sqlBorrar, params )
            .then((dato)=>{
                console.log(dato);
                return res.status(200).json({
                    mensaje: "Mascota borrada",
                    resultado : dato.rowCount
                })
            })
            .catch((error)=>{
                console.log(error);
                res.status(400).json({
                    mensaje: "Error borrando mascota",
                })
            })
    }

    protected static async editarMascota( sqActualizar: string, params:any, res:Response ) : 
    Promise<any>{
        await pool.task(async (consulta) => {
            return await consulta.result(sqActualizar, params);
        })
        .then((respuesta) => {
            console.log(respuesta);
            res.status(200).json({
                respuesta: "Mascota actualizada"
            })
        })
        .catch((mierror)=>{
            console.log("Error ", mierror);
            res.status(400).json({
                respuesta: "Mascota no actualizada",
            })
        })              
    } 
}

export default mascotasDao;