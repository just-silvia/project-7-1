const { User } = require("../db");
const { verifyToken } = require("../utilities/auth");
const { outError } = require("../utilities/errors");

/**
 * Verify user authorization
 * @param {string[]} roles 
 */
const authUser = (roles = []) => async (req, res, next) => {
    const bearer = req.headers.authorization || req.headers["Authorization"] || req.query.token;

    if (!bearer) return res.status(403).json("Not Authorized");
    
    const token = bearer.split(" ")[1];
    
    if (!token) return res.status(403).json("Not Authorized");

    try {
        const decoded = verifyToken(token);

        if (!roles.includes(decoded.role)) return res.status(403).json("Not Authorized");

        const user = await User.findOne({ _id: decoded._id, role: decoded.role }, "-password", { lean: true });

        if (!user)  return res.status(403).json("Not Authorized");

        req.user = user;
        return next();
    } catch(err) {
        outError(res, err, { code: 403, message: "Not Authorized" });
    }
}

module.exports = {
    authUser,
}