const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../routes/user");

const authenticate = async (req, res, next) => {
    // console.log(req.header("authorization"))
    let token = await req.header("authorization");

    if(!token) {
        return res.status(403).send({message: "Authorization Denied", isAutheticated: false})
    }
 
    token = token.split(" ")[1] 
    // console.log(token)
    try {
        const verify = jwt.verify(token, process.env.jwtSecret)
        // console.log(verify)
        req.user = verify.user;
        next();
    } catch (error) {
        res.status(401).send({message: "token is not valid", isAutheticated: false});
    }
};
module.exports = authenticate;