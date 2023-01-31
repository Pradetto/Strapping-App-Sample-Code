const db = require("../util/database");
const Router = require("express-promise-router");
const router = new Router();

// Initial Load & Scan Load CAPPED AT 100
router.get("/allLabels", async (req, res) => {
  const data = await db.query(
    "SELECT * FROM barcodes ORDER BY date DESC LIMIT 100"
  );
  res.json(data.rows);
});

router.get("/recentScannedLabels", async (req, res) => {
  const data = await db.query(
    "SELECT * FROM barcodes ORDER BY date DESC LIMIT 10"
  );
  res.json(data.rows);
});

//
router.post("/label", async (req, res) => {
  const body = req.body;
  const datetimeSQL = new Date().toISOString().slice(0, 19).replace("T", " ");
  const data = await db.query(
    "INSERT INTO barcodes (label, date) VALUES ($1,$2) RETURNING *",
    [body.label, datetimeSQL]
  );
  res.sendStatus(200);
});

module.exports = router;
