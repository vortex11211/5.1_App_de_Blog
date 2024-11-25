# Entrega 5.1: App de Blog

## 📄 Descripción

El propósito de este ejercicio es crear una API que respalde una aplicación de blog con las siguientes funcionalidades:

- Registro de usuarios.
- Inicio de sesión para acceder al contenido.
- Roles de usuario: admin y simpleUser.

### Funcionalidades para todos los usuarios:
- Crear publicaciones.
- Dar like a publicaciones.
- Ver, editar y eliminar sus propias publicaciones.
- Recuperar publicaciones eliminadas por error.
- Editar datos personales.

### Funcionalidades exclusivas del admin:
- Ver todos los usuarios.
- Bannear/reactivar usuarios.
- Eliminar publicaciones.

### Páginas del frontend:
- Formularios de registro e inicio de sesión.
- Página de inicio con publicaciones ordenadas por fecha de creación.
- Perfil de usuario para editar datos personales.

Las publicaciones deben mostrar:
- Contenido/descripción.
- Nombre del autor.
- Fecha de creación/edición.
- Porcentaje de popularidad (likes/(número de usuarios - 1)).

### Requisitos adicionales:
- Realizar el ejercicio en TypeScript.
- Utilizar MySQL como base de datos con Prisma como ORM.
- Gestionar errores con mensajes personalizados y códigos de error.
### ⭐  Nivel 1
- Documentar las rutas con Swagger.
- Implementar tests para cada endpoint.
- 
### ⭐⭐ Nivel 2
- Posibilidad de ordenar publicaciones por popularidad y autor.
- 
### ⭐⭐⭐ Nivel 3
- Uso del patrón Clean Architecture.
- Barra de búsqueda en la página de inicio con función debounce.

## 💻 Tecnologías Utilizadas

- TypeScript
- Node.js
- Express
- Prisma ORM
- MySQL
- Swagger para documentación
- Jest para pruebas
- React y Vite para el frontend

## 📋 Requisitos

- Node.js 
- MySQL 
- Prisma CLI
- npm como gestor de dependencias

## 🛠️ Instalación

#### 1.Clona el repositorio

` git clone https://github.com/vortex11211/5.1_App_de_Blog.git`
`cd 5.1_App_de_Blog`
   
#### 2. Instala las dependencias del backend:

 ``cd backend``
 ``npm install``
    
#### 3. Configura las variables de entorno del backend:
Crea un archivo `.env` basándote en la configuración proporcionada en el archivo `env.test`
###Edit to connect to your MySQL database
`DATABASE_URL = "mysql://user:password@localhost:3306/Blog?schema=public"`
###DataBase for testing
`DATABASE_URL_TEST="mysql://user:password@localhost:3306/sprint_5_blog_test?schema=public"`
###You can edit PORT number
`PORT = 3300`
###You can edit your JWT_SECRET_KEY
`JWT_SECRET_KEY = 'yoursecretkey' `

###You can edit your admin key
`ADMIN_KEY= "your_admin_key"`

### 4. Configura Prisma:

Utilizamos la base de datos acorde  este esquema:

![Diagrama Blog](https://raw.githubusercontent.com/vortex11211/2.1_Estructura_BasedeDatos_MySQL_Nivel3/refs/heads/master/Nivel%201/Pizzeria/Diagrama_Pizzeria.png)

`npx prisma migrate dev --name init`
`npx prisma generate`

### 5. Instala las dependencias del frontend:

``cd frontend``
``npm install``

### ▶️ Ejecución

1.  Inicia el servidor de desarrollo del backend:

`cd backend`
`npm run start`

Este script realizará la migración a la base de datos principal en caso de que se hayan realizado los test con anterioridad.


-- Nota: Aparecerá en la consola una dirección local donde podrás revisar la documentación usando Swagger. `http://localhost:XXXX/api-docs`  
Usará el puerto que hayas configurado.
##### 🧪Ejecutar Test
Para ejecutar los tests, utiliza el siguiente comando:

`cd backend`
`npm run test`

Este comando reinicia la base de datos de pruebas y realiza la migración correspondiente para ejecutar los tests utilizando Jest

2. En otra terminal inicia el servidor de desarrollo del frontend:

`cd ../frontend`
`npm run start`

3. Visita la dirección  `http://localhost:XXXX` que aparecerá en la consola con el número de puerto que hayas configurado.


## 🤝 Contribuciones
¡Gracias por querer contribuir a este proyecto! Sigue estos pasos para contribuir:

Haz un fork del proyecto.

Crea una rama con tu nueva funcionalidad: `git checkout -b nueva-funcionalidad`

Realiza los cambios necesarios y haz commit: `git commit -m 'Añadir nueva funcionalidad'`

Envía tus cambios a tu fork: `git push origin nueva-funcionalidad`

Abre un Pull Request en el repositorio original.