const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

//usando template engine
server.set("view engine", "ejs");

//Mudando o directore de views
server.set("views", path.join(__dirname, "views"));

//habilitar arquivos estáticos/statics
server.use(express.static("public"));

//usar req.body
server.use(express.urlencoded({ extended: true }));

//habilitar as rotas
server.use(routes);

server.listen(3000, () => console.log("rodando"));
