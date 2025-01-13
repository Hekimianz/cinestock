const { Router } = require("express");
const manageRouter = Router();
const manageController = require("../controller/manageController");

manageRouter.get("/", manageController.manageGetAll);

module.exports = manageRouter;
