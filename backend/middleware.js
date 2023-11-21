const jwt = require('jsonwebtoken')
var cookies = require("cookie-parser");


// let jwt_secret = "https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ"
let jwt_secret = "hello";
exports.requireSignin = (req, res, next) => {
    // console.log(req)
    // console.log("Inside require sign in ", req.headers.authorization)
    // if (req.headers.authorization) {
    //     console.log("Header Verification")
    //     // console.log("Request is : ",req.body)
    console.log('farmer:', req.user);
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", req.headers.authorization);
    try {
        const user = jwt.verify(token, jwt_secret);
        console.log("under Try");
        console.log(user);

        req.role = 'farmer';
        req.user = user;
        next();
    }
    catch (err) {
        console.log("rejected!!!");
        res.clearCookie("token");
        return res.redirect('/');

    }
}

exports.userMiddleware = (req, res, next) => {
    console.log("Inside usermiddleware");
    console.log("Username is:", req.role);
    if (req.role != "farmer") {
        return res.status(400).json({ message: "Access Denied" })
    }
    next()
}

