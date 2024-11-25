# Entrega 5.1: App de Blog

## 📄 Descripción

El propósito de este ejercicio es crear una API que respalde una aplicación de blog con las siguientes funcionalidades:

- Registro de usuarios.
- Inicio de sesión para acceder al contenido.
- Roles de usuario: admin y simpleUser.

### Funcionalidades para todos los usuarios:
- Crear publicaciones.
- Dar like a publicaciones de otros usuarios.
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
- Documentar las rutas con Swagger.
- Implementar tests para cada endpoint.
- Posibilidad de ordenar publicaciones por popularidad y autor.
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
- React para el frontend

## 📋 Requisitos

- Node.js (versión 14 o superior)
- MySQL (versión 5.7 o superior)
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
##Edit to connect to your MySQL database
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

`npx prisma migrate dev --name init`
`npx prisma generate`

### 5. Instala las dependencias del frontend:

``cd frontend``
``npm install``



🤝 Contribuciones
¡Gracias por querer contribuir a este proyecto! Sigue estos pasos para contribuir:

Haz un fork del proyecto.

Crea una rama con tu nueva funcionalidad: git checkout -b nueva-funcionalidad

Realiza los cambios necesarios y haz commit: git commit -m 'Añadir nueva funcionalidad'

Envía tus cambios a tu fork: git push origin nueva-funcionalidad

Abre un Pull Request en el repositorio original.