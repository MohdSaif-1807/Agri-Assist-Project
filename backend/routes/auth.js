const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { requireSignin } = require("../middleware");
const { promisify } = require("util");
const UserRegister = require("../models/userRegister");
const FarmerRegister = require("../models/farmerRegister");
const { token } = require("morgan");
const nodemailer = require("nodemailer");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const NODE_ENV = process.env.NODE_ENV;

console.log(JWT_SECRET, JWT_EXPIRES, NODE_ENV, "hello");
const signJwt = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES,
    });
};

const sendToken = (user, statuscode, req, res) => {
    const token = signJwt(user._id);
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + JWT_EXPIRES),
        secure: NODE_ENV === "production" ? true : false,
        httpOnly: NODE_ENV === "production" ? true : false,
    });
    console.log("Inside send token");
    res.status(statuscode).json({
        // status:"Success",
        token,
    });
};

const signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Signed out successfully !",
    });
};
//MIDDLEWARE

const decryptJwt = async (token) => {
    const jwtverify = promisify(jwt.verify);
    return await jwtverify(token, JWT_SECRET);
};
secure = async (req, res, next) => {
    let token;
    if (req.cookies) token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({
            status: "unauthorized",
            message: "You are not authorized to view the content",
        });
    }
    const jwtInfo = await decryptJwt(token);
    console.log(jwtInfo);
    const user = await Signup.findById(jwtInfo.id);
    req.user = user;
    next();
};

checkField = (req, res, next) => {
    var firstname = req.body.FirstName;
    var lastname = req.body.LastName;
    var phone = req.body.PhoneNumber;
    var email = req.body.Email;
    var password = req.body.Password;
    var cpassword = req.body.CnfrmPassword;
    if (!firstname || !email || !password || !cpassword || !lastname || !phone || !streetaddress || !zipcode || !stateinfo || !city || !country) {
        console.log("Please enter all the field");
        res.send("Please enter all the field");
    } else {
        next();
    }
};

checkFieldLogin = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password) {
        console.log("Please enter all the fields");
        res.send("Please enter all the fields");
    } else {
        next();
    }
};

async function checkUsername(req, res, next) {
    var email = req.body.Email;
    try {
        var checkExistUsername = await Signup.findOne({ email: email }).exec();
        if (!checkExistUsername) {
            next();
        }
        else {
            console.log("Email Exists");
            res.send("Email already exists");
        }
    } catch (err) {
        console.log(err);
    }
}

function checkPassword(req, res, next) {
    var password = req.body.Password;
    var cpassword = req.body.CnfrmPassword;
    if (password != cpassword) {
        console.log("Password did not matched");
        res.send("Password did not matched");
    }
    else {
        next();
    }
}
// // for parsing application/json

router.use(express.json());
router.use(
    express.urlencoded({
        extended: true,
    }),
);

router.get("/", (req, res) => res.send("This is Home page !!"));

async function checkEmail(req, res, next) {
    if (req.body.IsFarmer) {
        const response = await FarmerRegister.findOne({ email: req.body.Email }).exec();
        if (response) {
            res.status(400).send("Email already Exists!!");
        }
        else {
            next();
        }
    }
    else {
        const response = await UserRegister.findOne({ email: req.body.Email }).exec();
        if (response) {
            res.status(400).send("Email already exists!!");
        }
        else {
            next();
        }
    }
}

function checkPasswordSimiliarity(req, res, next) {
    if (req.body.Password === req.body.ConfirmPassword) {
        next();
    }
    else {
        res.status(400).send("Passwords DO NO MATCH");
    }
}

checkAllFields = ((req, res, next) => {
    // const data = req.body;
    console.log("this is request", req);
    console.log("this is request body", req.body);
    // console.log(data);
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const phoneNumber = req.body.PhoneNumber;
    const email = req.body.Email;
    const password = req.body.Password;
    const confirmPassword = req.body.ConfirmPassword;
    const isFarmer = req.body.IsFarmer;
    const farmerID = req.body.FarmerID;
    if (isFarmer) {
        if (!firstName || !lastName || !phoneNumber || !email || !password || !confirmPassword || !farmerID) {
            res.status(400).send("Required Feilds are empty");
        }
        else {
            next();
        }
    }
    else {
        if (!firstName || !lastName || !phoneNumber || !email || !password || !confirmPassword) {
            res.status(400).send("Required Feilds are empty");
        }
        else {
            next();
        }
    }
});
router.post(
    "/signup",
    checkAllFields,
    checkEmail,
    checkPasswordSimiliarity,
    async (req, res) => {
        console.log("Signup :", req.body);
        var firstName = req.body.FirstName;
        var lastName = req.body.LastName;
        var phoneNumber = req.body.PhoneNumber;
        var emailID = req.body.Email;
        var password = req.body.Password;
        var farmerID = req.body.FarmerID;
        var isFarmer = req.body.IsFarmer;
        try {
            if (isFarmer === true) {
                const newFarmerSignUp = await FarmerRegister.create({
                    firstname: firstName,
                    lastname: lastName,
                    phonenumber: phoneNumber,
                    email: emailID,
                    password: password,
                    farmerId: farmerID
                })
                console.log(newFarmerSignUp);
            }
            else {
                const newUserSignup = await UserRegister.create({
                    firstname: firstName,
                    lastname: lastName,
                    email: emailID,
                    phonenumber: phoneNumber,
                    password: password,
                });
                console.log(newUserSignup);
            }
            res.send("Done");
        } catch (err) {
            res.status(401).json(err.message);
        }
    }
);

// let jwt_secret = "https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ"

let jwt_secret = "hello";

router.post("/login", async (req, res, next) => {
    console.log("Login :", req.body);
    const email = req.body.Email;
    const password = req.body.Password;
    const isFarmer = req.body.IsFarmer;
    if (isFarmer === true) {
        var checkAvailibilty = await FarmerRegister.findOne({ email: email }).exec();
        if (checkAvailibilty) {
            console.log("in login farmer");
            console.log(checkAvailibilty);
            var passWord = checkAvailibilty.password;
            if (passWord === password) {
                console.log("Log In");
                const jwt_token = jwt.sign(
                    { _id: checkAvailibilty._id, role: "farmer" },
                    JWT_SECRET,
                    { expiresIn: "1hr" }
                );
                console.log("after login " + jwt_token);
                res.cookie("token", token, { expiresIn: "1hr" });
                res.status(200).json({
                    jwt_token,
                    _id: checkAvailibilty._id,
                    user: 'farmer',
                });
                // res.send(isFarmer);
                console.log("Login successfull");
                // res.redirect("/marketplace")
            }
            else {
                console.log("Please check again !");
                res.status(400).send("Incorrect Password!!");
            }
        }
        else {
            res.status(400).send("Farmer Does Not Exist!!");
        }
    }
    else {
        var checkAvailibilty = await UserRegister.findOne({ email: email }).exec();
        if (checkAvailibilty) {
            console.log("in Login");
            var passWord = checkAvailibilty.password;
            if (passWord === password) {
                console.log("Log In");
                const jwt_token = jwt.sign(
                    { _id: checkAvailibilty._id, role: "user" },
                    JWT_SECRET,
                    { expiresIn: "1hr" }
                );
                console.log("after login " + jwt_token);
                res.cookie("token", token, { expiresIn: "1hr" });
                res.status(200).json({
                    jwt_token,
                    _id: checkAvailibilty._id,
                    user: 'user',
                });
                // res.send(isFarmer);
                console.log("Login successfull");
                // res.redirect("/marketplace")
            }
            else {
                console.log("Please check again !");
                res.status(400).send("Incorrect Password!!");
            }
        }
        else {
            res.status(400).send("User Does Not Exist!!");
        }
    }
});
// }

// }
// var checkUser = Signup.findOne({ email: email });
// checkUser.exec((err, data) => {
//     if (!data) {
//         console.log("Not exist");
//         res.send("Email does not exist");
//     } else {
//         var dbpassword = data.password;
//         if (dbpassword == password) {
//             console.log("Logging in");
//             const jwt_token = jwt.sign(
//                 { _id: data._id, role: "user" },
//                 process.env.JWT_SECRET,
//                 { expiresIn: "1hr" }
//             );
//             console.log("after loggin" + jwt_token);
//             // res.send("successfull")
//             res.cookie("token", token, { expiresIn: "1hr" });
//             res.status(200).json({
//                 jwt_token,
//                 user: data,
//             });
//             console.log("Login successfull");
//         } else {
//             console.log("Please check again !");
//             // res.status(400).json({
//             //     message: "Password Incorrect"
//             // })
//             res.send("Password Incorrect");
//         }
//     }
// });


// });

router.post('/sendEmail', (req, res) => {
    console.log(req.body.Name);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'agricultureassist0572@gmail.com',
            pass: 'kmfc yvze zuqj mdig'
        }
    });

    var mailOptions = {
        from: 'agricultureassist0572@gmail.com',
        to: 'saifmohd1807@gmail.com',
        subject: req.body.Subject,
        html: `<b>From: </b>${req.body.Email}
                <br>
                <b>Phone Number: </b>${req.body.Phone}
                <br>
                <b>Issue: </b>${req.body.Issue}
                `
    };

    transporter.sendMail(mailOptions)
        .then((info) => {
            console.log('Email sent: ' + info.response);
            res.status(200).send("Mail Sent Successfully!!");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send("Mail Sending Failed!! Something Went Wrong")
        })

    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         
    //     }
    // });
    console.log(req.body);
})



router.post("/checktoken", requireSignin, (req, res) => {
    res.status(200).json({});
});
router.post("/signout", (req, res) => {
    res.clearCookie('token');
});
router.post("/feed", requireSignin, (req, res) =>
    res.status(200).json({
        message: "Working fine",
    })
);

module.exports = router;
