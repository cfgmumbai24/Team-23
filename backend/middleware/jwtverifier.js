const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const env = require('dotenv');

env.config({ path: './config.env' });


const middleware = async (req, res, next) => {
    console.log("Middleware")
    // console.log(req.headers)

    if (req.headers.token) {
        const bearerToken = req.headers.token.split(" ");
        const token = bearerToken[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                return res.status(400).send({ message: "invalid token" });
            }
            else {
                req.user_id = authData._id;
                req.role=authData.role;
                next();
            }
        })
    }

    else {
        console.log("else");
        return res.status(400).send({ message: "invalid token" });
    }

}

module.exports = middleware;