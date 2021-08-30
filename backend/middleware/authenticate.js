const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../routes/user");

const config = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT, 
    jwtSecret: process.env.jwtSecret, 
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};


const pool = new Pool(config);

pool.on('connect', () => {
  console.log('Connected to the Database');
});

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