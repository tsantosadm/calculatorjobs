const express = require("express");
const server = express();
const routes = require("./routes");

server.set("view engine", "ejs");

//habilitar arquivos estáticos/statics
server.use(express.static("public"));

//usar req.body
server.use(express.urlencoded({ extended: true }));

//habilitar as rotas
server.use(routes);

server.listen(3000, () => console.log("rodando"));
