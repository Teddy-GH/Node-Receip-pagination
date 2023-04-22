var recipes = require("../recipes.json");
var router = require("express").Router();

router.get("/", paginatedResults(recipes), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let results = [];

    try {
      results = model.slice(startIndex, endIndex);
      res.status(200);
      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = router;
