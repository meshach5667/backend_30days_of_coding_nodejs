const express = require("express");
const app = express();
const port = 5000;

app.get("/ok", (req, res) => {
    res.status(200).setHeader("Custom-Header", "CustomHeaderValue").send("OK Response");
});

app.post("/created", (req, res) => {
    res.status(201).send("Created");
});

app.get("/moved-permanently", (req, res) => {
    res.status(301).send("Moved Permanently");
});

app.get("/bad-request", (req, res) => {
    res.status(400).send("Bad request");
});

app.get("/unauthorized", (req, res) => {
    res.status(401).send("Unauthorized");
});

app.get("/not-found", (req, res) => {
    res.status(404).send("Page not found");
});

app.get("/internal-server-error", (req, res) => {
    res.status(500).send("Internal server error");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
