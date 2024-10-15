import { Router } from "express";
import ControlMascotas from "../controller/mascota/mascotaControlador";

class Rutas {
  public rutasApi: Router;

  constructor() {
    this.rutasApi = Router();
    this.config();
  }

  public config() {
    this.rutas();
  }

  public rutas() {
    // Rutas por la cual se consume la API
    // Ejemplo GET: http://localhost:8082/cuidame/listar
    this.rutasApi.get("/listar", ControlMascotas.getMascotas);
    this.rutasApi.get("/listarPorId/:id", ControlMascotas.getMascotaPorId);
    this.rutasApi.get("/obtenerUsuario/:id", ControlMascotas.getUsuarioMascota);
    this.rutasApi.post("/crear", ControlMascotas.postMascota);
    this.rutasApi.delete("/eliminar/:id", ControlMascotas.deletMascota);
    this.rutasApi.put("/actualizar", ControlMascotas.putMascota);
  }
}

const misRutas = new Rutas();
export default misRutas.rutasApi;
