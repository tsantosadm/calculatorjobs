const express = require("express");
const routes = express.Router();
const ProfileControllers = require("./controllers/ProfileControllers");
const JobController = require("./controllers/JobController");
const DashboardController = require("./controllers/DashboardController");

routes.get("/", DashboardController.index);
routes.get("/job", JobController.create);
routes.post("/job", JobController.save);
routes.get("/job/:id", JobController.show);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);
routes.get("/profile", ProfileControllers.index);
routes.post("/profile", ProfileControllers.update);

module.exports = routes;
