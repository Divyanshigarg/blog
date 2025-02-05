const jwt = require('jsonwebtoken')
const {response} = require('../helper/response')
require('dotenv').config()

function verifyJwt(req, res, next) {
    try{
        const authorization = req.headers.authorization;
        if (!authorization) return response(res, 401, false,  "Token is required" );

        const token = authorization.split(" ")[1];
        
        if (!token) {
            return response(res, 401, false, "Invalid token format");
        }

        // Verify the JWT
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return response(res, 401, false, "Invalid or expired token");
            }
           
            req.user = decoded;
            next(); 
        });

    }catch(error){
        console.log(error)
        return response(res, 500, false, 'Internal Server Error',{})
    }
}

module.exports = verifyJwt