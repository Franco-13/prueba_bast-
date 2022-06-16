# Ejercicio Full Stack Developer - Bastó

## Pasos para ejecutar la aplicación

Versiónes utilizadas:

- **Node**: v16.14.0
- **NPM**: 8.3.1

Para verificar que versión se tiene instalada:

> node -v
>
> npm -v

El proyecto está separado en dos carpetas: `api` y `client`. En estas carpetas esta el código del back-end y el front-end respectivamente.

## Carpeta api

- En `api` crear un archivo llamado: `.env` en donde estará la url de la base de datos de Mongo:

```
MONGO_DB_URL=urlDbMongo
```

- Posicionarse en la carpeta `api`
- Iniciar una terminal en el editor de código y ejecutar el comando `npm install` para instalar las dependecias necesarias
- Una vez finalizada la instalacion de dependencias ejecutar en la terminal el comando `npm start`, si todo va bien deberá verse una respuesta como la siguiente

```
[nodemon] restarting due to changes...
[nodemon] starting node index.js
server listening at 3001
Mongo bastoDB connected!
```

## Carpeta client

- Posicionarse en la carpeta `client`
- Iniciar una terminal en el editor de código y ejecutar el comando `npm install` para instalar las dependecias necesarias
- Una vez finalizada la instalacion de dependencias ejecutar en la terminal el comando `npm start`, si todo va bien deberá verse una respuesta como la siguiente y desplegar la aplicación en el navegador.

```
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.11:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```
