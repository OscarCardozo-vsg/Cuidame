CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY NOT NULL,
    nombre varchar(50) NOT NULL,
    apellidos varchar(50) NOT NULL,
    correo varchar(75) NOT NULL,
    password varchar(254) NOT NULL,
    telefono varchar(15) NOT NULL,
    estado boolean NOT NULL
);

CREATE TABLE mascotas (
    id_mascota SERIAL PRIMARY KEY NOT NULL,
    nombre varchar(25) NOT NULL,
    foto_path varchar(30) NOT NULL,
    sexo INTEGER NOT NULL,
    especie varchar(20) NOT NULL,
    raza varchar(20) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    chip varchar(15) NOT NULL,
    descripcion varchar(250) NOT NULL,
    estado boolean NOT NULL,
    id_usuario int4 NOT NULL
);

ALTER TABLE mascotas ADD CONSTRAINT usuarios_mascotas_fk
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
;


---DDL para usuarios

INSERT INTO usuarios (nombre, apellidos, correo, password, telefono, estado)
VALUES 
('Juan', 'Pérez', 'juan.perez@example.com', 'hashed_password_here', '1234567890', true),
('Ana', 'García', 'ana.garcia@example.com', 'hashed_password_here', '0987654321', true),
('Carlos', 'Lopez', 'carlos.lopez@example.com', 'hashed_password_here', '1122334455', true);

INSERT INTO mascotas (nombre, foto_path, sexo, especie, raza, fecha_nacimiento, chip, descripcion, estado, id_usuario) 
VALUES 
('Niño', '1729024242045-106183587.jpg', 0, 'Loro', 'Ojo blanco', '2008-06-19', 'Chip-12331231', 'Un loro muy lindo', true, 1),
('Copi', '1729024648126-66342314.jpg', 0, 'Perro', 'Husky', '2017-02-15', 'Chip-12331231', 'Es muy grande', true, 2),
('Nala', '1729024701348-294640094.jpeg', 1, 'Gato', 'Arabe', '2022-07-01', 'chip-1231212', 'Temperamento fuerte', true, 3),
('Dora', '1729024748060-537636736.jpeg', 1, 'Perro', 'Boxer', '2024-07-06', 'Chip-2342', 'Muy tierna', true, 1);
