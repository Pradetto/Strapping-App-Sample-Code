const db = require("../util/database");
const Router = require("express-promise-router");
const router = new Router();

const fullDayCalc = 24 * 60 * 60 * 1000;

// ASSUMPTION FOR MONTHS IS 3O DAYS

router.get("/1week", async (req, res) => {
  const date = new Date(Date.now() - 7 * fullDayCalc).toLocaleDateString();
  const data = await db.query(
    "SELECT * FROM barcodes WHERE date >= ($1) ORDER BY date DESC",
    [date]
  );
  res.json(data.rows);
});

router.get("/2weeks", async (req, res) => {
  const date = new Date(Date.now() - 7 * fullDayCalc).toLocaleDateString();
  const data = await db.query(
    "SELECT * FROM barcodes WHERE date >= ($1) ORDER BY date DESC",
    [date]
  );
  res.json(data.rows);
});

router.get("/1month", async (req, res) => {
  const date = new Date(Date.now() - 30 * fullDayCalc).toLocaleDateString();
  const data = await db.query(
    "SELECT * FROM barcodes WHERE date >= ($1) ORDER BY date DESC",
    [date]
  );
  res.json(data.rows);
});

router.get("/3months", async (req, res) => {
  const date = new Date(Date.now() - 90 * fullDayCalc).toLocaleDateString();
  const data = await db.query(
    "SELECT * FROM barcodes WHERE date >= ($1) ORDER BY date DESC",
    [date]
  );
  res.json(data.rows);
});

router.get("/6months", async (req, res) => {
  const date = new Date(Date.now() - 180 * fullDayCalc).toLocaleDateString();
  const data = await db.query(
    "SELECT * FROM barcodes WHERE date >= ($1) ORDER BY date DESC",
    [date]
  );
  res.json(data.rows);
});

router.get("/1year", async (req, res) => {
  const date = new Date(Date.now() - 365 * fullDayCalc).toLocaleDateString();
  const data = await db.query(
    "SELECT * FROM barcodes WHERE date >= ($1)ORDER BY date DESC",
    [date]
  );
  res.json(data.rows);
});

module.exports = router;

// Pure js one line solution:
// const sevenDaysAgo: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
// new Date() - create Date object from calculated milliseconds time.
// Date.now() - gives time in milliseconds from 1970 to now.
// 7 (days) * 24 (hours) * 60 (minutes) * 60 (seconds) * 1000 (milliseconds ) = 604800000 (7 days in milliseconds).
// You can use calculated value if you have no plans to change substracted value, or computed for easy change of substracted amount of days, minutes and so on.
