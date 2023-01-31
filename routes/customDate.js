const db = require("../util/database");
const Router = require("express-promise-router");
const router = new Router();

router.get("/from", async (req, res) => {
  const date = req.query.fromDate;
  const data = await db.query(
    "SELECT * FROM barcodes WHERE date >= ($1) ORDER BY date DESC",
    [date]
  );
  res.json(data.rows);
});

router.get("/between", async (req, res) => {
  const startDate = req.query.fromDate;
  const endDate = req.query.toDate;
  const data = await db.query(
    "SELECT * FROM barcodes WHERE date BETWEEN ($1) AND ($2) ORDER BY date DESC",
    [startDate, endDate]
  );
  res.json(data.rows);
});

module.exports = router;
