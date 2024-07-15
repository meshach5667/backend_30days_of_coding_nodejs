const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
    throw new Error("500: internal server error"); /*  */
    // i delibrately caused this error
});

app.use("/not-found",(req, res, next) => {
    // console.error(err.stack);
    res.status(400).json({
        "message": "resource not found"
    }).send("page not found");
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
