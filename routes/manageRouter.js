const { Router } = require("express");
const manageRouter = Router();
const manageController = require("../controller/manageController");

manageRouter.get("/", async (req, res) => {
  const { title, tags } = req.query;

  const processedTags = tags ? (Array.isArray(tags) ? tags : [tags]) : null;
  if (title || processedTags) {
    await manageController.manageGetFiltered(req, res);
  } else {
    await manageController.manageGetAll(req, res);
  }
});

module.exports = manageRouter;
