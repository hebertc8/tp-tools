const sql = require("./sql.controller");
const parametros = require("./params.controller").parametros;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { decrypt } = require("./crypt.controller");

exports.CallSp = (spName, req, res) => {
        const payload = jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET);
        const idccms = JSON.parse(decrypt(payload.data)).data.idccms;
        //const idccms = 3458765
        req.body.idccms = idccms;
        sql
            .query(spName, parametros(req.body, spName))
            .then((result) => {
                responsep(1, req, res, result);
            })
            .catch((err) => {
                console.log(err, 'sp')
                responsep(2, req, res, err);
            });
    }
    // };

function isEmpty(req) {
    for (var key in req) {
        if (req.hasOwnProperty(key))
            return false;
    }
    return true;
}

exports.test = (req, res) => {
    let num = Math.floor(Math.random() * (100 - 1)) + 1;
    let options = {
        //ms s    m     h   d
        maxAge: 1000 * 60 * 60 * 24 * 60, // would expire after 15 minutes
        httpOnly: true,
    };
    res.cookie("XSRF-TOKEN", req.csrfToken(), options);
    res.status(200).json({ random: num });
};

exports.test2 = (req, res) => {
    res.status(200).json({ RST: "Funcional" });
};

let responsep = (tipo, req, res, resultado, cookie) => {
    return new Promise((resolve, reject) => {
        if (tipo == 1) {
            res.cookie("XSRF-TOKEN", req.csrfToken(), {
                "max-Age": new Date(Date.now() + 90000000),
                path: "/",
            });
            res.status(200).json(resultado);
            resolve('Enviado')
        } else if (tipo == 2) {
            console.log("Error at:", new Date(), "res: ", resultado);
            res.status(400).json(resultado);
            reject('Paila')
        }
    });
};