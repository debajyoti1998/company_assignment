const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async function (req, res) {
  res.send({ status: "live", time: new Date().getTime() });
});

app.get("/api/managed-records/:id", async function (req, res) {
  try {
    const page = req.params.id;
    const record = await axios.get("http://localhost:8000/records", {
      timeout: 5,
    });
    if (record.status === 200 && record.data.success === 1) {
      const current_data = record.data.data.filter((v, index) => {
        return index >= (page - 1) * 10 && index < page * 10;
      });
      res.send({ success:1,count:record.data.data.length, data: current_data });
      
    } else {
      res.send({ success: 0, time: new Date().getTime() });
    }
  } catch (err) {
    console.log(err);
    res.send({ success: 0, time: new Date().getTime() });
  }
});

const PORT = process.env.PORT || 8010;
app.listen(PORT, () => {
  console.log(
    `---- Server started , Listing on PORT : http://localhost:${PORT}`
  );
});
