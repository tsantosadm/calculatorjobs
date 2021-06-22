const express = require("express");
const server = express();
const routes = require("./routes");

server.set("view engine", "ejs");

//habilitar arquivos estáticos/statics
server.use(express.static("public"));

//habilitar as rotas
server.use(routes);

server.listen(3000, () => console.log("rodando"));
