const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "..", "public");

app.use(express.static(publicPath));

// pastikan ini di paling akhir middlewares krn akan fallback seluruh path request
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("server is up");
});
