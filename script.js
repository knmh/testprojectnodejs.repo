const express = require("express");
const { body, validationResult } = require("express-validator");
let users = require("./user");
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

app.post(
    "/user/na/h/post",

    [
        body("n", "n must valid").notEmpty(),
        body("e", "e must be valid").isEmail(),
    ],

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ data: null, errors: errors.array(), mes: "VE" });
        }

        users.push({ id: users.length + 1, ...req.body });
        res.json({ data: users, mes: 200 });
    }
);

app.put(
    "/user/na/h/put/:id",

    [
        body("n", "n must valid").notEmpty(),
        body("e", "e must be valid").isEmail(),
    ],

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ data: null, errors: errors.array(), msg: "validation error" });
        }

        const userIndex = users.findIndex((u) => u.id == req.params.id);
        if (userIndex === -1) {
            return res.status(404).json({ data: null, errors: [], msg: "not found" });
        }

        users[userIndex] = {...users[userIndex], ...req.body };

        res.json({
            data: users,
            msg: "ok",
        });
    }
);

app.delete(
    "/user/na/h/delete/:id",

    [body("n", "n valid").notEmpty(), body("e", "e valid").isEmail()],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ data: null, errors: errors.array(), msg: "validation error" });
        }

        const userIndex = users.findIndex((u) => u.id == req.params.id);
        if (userIndex === -1) {
            return res.status(404).json({ data: null, errors: [], msg: "not found" });
        }

        users.splice(userIndex, 1);
        res.json({
            data: users,
            msg: "ok",
        });
    }
);