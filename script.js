const express = require("express");
const users = require("./user");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.listen(port, () => console.log("hiiiii"));

app.get("/user/na/", (req, res) => {
    console.log(req.query);

    res.send([
        { id: 1, name: "dh" },
        { id: 2, name: "dchxhh" },
    ]);
});

app.get("/user/na/h", (req, res) => {
    res.json({ data: users, mes: 200 });
});
app.get("/user/na/h/:id", (req, res) => {
    const user = users.find((u) => u.id == req.params.id);
    if (!user) return res.status(404).json({ data: null, mes: 404 });

    res.json({ data: req.params.id, mes: 200 });
});

app.post("/user/na/h/post", (req, res) => {
    users.push({ id: users.length + 1, ...req.body });
    res.json({ data: users, mes: 200 });
});