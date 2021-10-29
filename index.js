const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("This is from express js server");
});
app.get("/api", (req, res) => {
    res.send("This is from api endpoints");
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
