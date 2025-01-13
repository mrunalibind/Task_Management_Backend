import jwt from "jsonwebtoken";
import User from "../models/users.js";

let authentication = async (req, res, next) => {

    let token = req.cookies.token;
    // console.log({token})

    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (decoded) {
            req.user = await User.findById(decoded.id);
            next();
        }
        else {
            res.status(500).send({ msg: err });
        }
    });

}
export default authentication;