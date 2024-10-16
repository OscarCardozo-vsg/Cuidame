DESCRIPCIÓN:

	Este proyecto fue diseñado para el manejo de mascotas, 
	se realizo usando el entorno de ejecución nodejs con el framework express.
	El frontend fue desarrollado con el framework React con la librerías de Material-UI.
	La aplicación permite crear, observar, editar, 
	eliminar y mostrar la información de tus mascotas.

FUNCIONALIDADES:

	- Gestión de Mascotas: Añadir, editar y eliminar mascotas con detalles como nombre, especie, raza y descripción.
	- Subida de Imágenes: Subir imágenes de mascotas utilizando multer en el backend.
	- Funcionalidad de Búsqueda: Buscar mascotas utilizando como filtro el nombre.
	- Interfaz de Usuario Amigable: Construida con Material-UI para un diseño moderno y responsive.

LIBRERIAS Y DEPENDENCIAS:

- Backend:
    - express
    - typeScript
    - cors
    - dotnev
    - morgan
    - pg-promise
    - multer

EJECUCIÓN:

*) BACKEND:

	1) Crear la base de datos en un sistema gestor de base de datos ( En este caso use postgresSQL ), 
	   e implementar las sentencias encontradas en la carpeta: src/config/db/PruebaTecnicaBD.sql

	2) Crear la base de datos y configurar los valores en el archivo del backend: src/config/dominios/varDB.ts

	3) Abir la terminal en la carpeta backend y descargar las dependencias necesarias:
		- npm install express typescript cors dotenv morgan pg-promise multer

	4) Ejecutar el backend por medio del comando:
		- npm run dev

*) El servidor backend por defecto corre en la URL http://localhost:8082.
