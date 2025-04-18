const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

const collectionRoutes = require("./routes/collectionRoutes");

app.use("/api/v1", collectionRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
