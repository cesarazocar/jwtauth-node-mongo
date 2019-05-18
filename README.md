# jwtauth-node-mongo
Tutorial Json Web Tokens con apuntes en comentarios

npm i express body-parser mongoose jsonwebtoken morgan

Server muestra usuarios localhost:3000/api/users 
si se valida el token enviado por json, 
query (navegador: localhost:3000/api/users?token=x.y.z) 
o por cabecera: 'x-access-token' 

para crear token enviar post a localhost:3000/api/authenticate 
enviar usuario y contraseña via json

{
  "name":"userName",
  "password":"password"
  
}
