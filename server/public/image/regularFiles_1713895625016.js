const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "",
    database: "hubsyntax",
});

pool.getConnection((err) => {
    if (err) {
        console.error("Error in connection:", err);
    } else {
        console.log("Connected!");

    }
});

app.post('/start', (req, res) => {
    console.log("Request Body:", req.body);

    const sql = "SELECT * FROM login_form WHERE email = ? AND password = ?";
    const values = [
        req.body.email,
        req.body.password
    ];

    pool.query(sql, values, (error, data) => {

        if (data.length === 0) {
            return res.json({ Error: "invalid email or password" });
        }
        else {
            return res.json({ Status: "success" });
        }
    });
});
pool.query(`select * login_form`, (filed, error, result) => {
    if (error) {
        return console.log(error);
    }
    return console.log(result);

});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
