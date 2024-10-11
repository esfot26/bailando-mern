# Music App

Este proyecto es una aplicación de música que consta de un servidor construido con Node.js y un cliente desarrollado con React. Este documento proporciona instrucciones sobre cómo configurar y ejecutar el proyecto en un entorno Windows.


## Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu máquina. Puedes verificar la instalación ejecutando el siguiente comando en la terminal:

Instalar estas dependencias 
npm install cors dotenv express mongoose nodemon

Configura el archivo .env en el directorio del servidor. Crea un archivo .env y agrega las variables necesarias para tu aplicación, por ejemplo:

PORT=5000
DB_URI=mongodb://localhost:27017/tu_base_de_datos

Para iniciar el servidor, ejecuta el siguiente comando:

npm run dev

Configuración del Cliente
Regresa al directorio raíz del proyecto:

cd ..
Navega al directorio del cliente:

cd music-app
Instala las dependencias del cliente ejecutando el siguiente comando:

npm install axios react react-dom react-router-dom @types/react @types/react-dom @vitejs/plugin-react-swc vite eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh

Para iniciar el cliente, ejecuta el siguiente comando:

npm run dev
