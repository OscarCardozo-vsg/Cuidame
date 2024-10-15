// Queries para realizar peticiones en la base de datos
export const SQL_MASCOTA ={
    LISTAR_TODOS:"SELECT * FROM mascotas",
    LISTAR_POR_ID: "SELECT * FROM mascotas WHERE id_mascota = $1",
    OBTENER_USUARIO: "SELECT nombre, apellidos, correo, telefono FROM usuarios WHERE id_usuario = $1",
    CREAR: "INSERT INTO mascotas (nombre, foto_path, sexo, especie, raza, fecha_nacimiento, chip, descripcion, estado, id_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id_mascota",
    ELIMINAR: "DELETE FROM mascotas WHERE id_mascota = $1",
    EDITAR: "UPDATE mascotas SET nombre = $2, foto_path = $3, sexo = $4, especie = $5, raza = $6, fecha_nacimiento = $7, chip = $8, descripcion = $9, id_usuario = $10 WHERE id_mascota = $1"
}