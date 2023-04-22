module.exports = (req, res, next) => {
    const { page = 1, limit = 3, q = '' } = req.query;
    if (page == undefined  || limit == undefined) {
      res.status(200);
      page = 1;
      limit = 3;
    }
    console.log("query", q);
    req.context = {
      page: +page,
      limit: +limit,
      skip: (page - 1) * limit,
      searchTerm: q,
      search: new RegExp(q, "gi")
    };
    next();
  };