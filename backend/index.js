const express = require("express");
const cors = require("cors");
const jsonData = require("./data")
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async function (req, res) {
  res.send({ status: "live", time: new Date().getTime() });
});

app.get("/records", async function (req, res) {
  res.send({ success: 1, data: jsonData });
});




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `---- Server started , Listing on PORT : http://localhost:${PORT}`
  );
});
