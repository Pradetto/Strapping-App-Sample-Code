// Need to add dotenv config

const express = require("express");

const app = express();

const path = require("path");

const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname + "/public")));

//Database
const db = require("./util/database");

//Routes
const dashboardRouter = require("./routes/dashboard");
const filtersPresetRouter = require("./routes/filtersPreset");
const customDateRouter = require("./routes/customDate");

//Middleware
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api", dashboardRouter);
app.use("/api/preset", filtersPresetRouter);
app.use("/api/custom", customDateRouter);

app.listen(PORT, () => `Server Running on ${PORT}`);
