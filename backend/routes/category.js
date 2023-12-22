const postitem = require("../models/postItem");
const { requireSignin, userMiddleware } = require("../middleware");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const upload = multer();
const KeyPath = "/etc/secrets/service.json";
var aws = require("aws-sdk");
var multerS3 = require("multer-s3");
const path = require("path");
const stream = require("stream");
const accesskey = process.env.AWSACCESSKEY
const awssecret = process.env.AWSSECRETACCESSKEY
const awsbucket = process.env.AWSBUCKET

//AWS S3 BUCKET METHOD:


// const AWS = new aws.S3({
//     accessKeyId: accesskey,
//     secretAccessKey: awssecret,
// });
// var uploadS3 = multer({
//     storage: multerS3({
//         s3: AWS,
//         bucket: awsbucket,
//         acl: "public-read",
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             cb(null, shortid.generate() + "-" + file.originalname + "-" + Date.now());
//         },
//     }),
// });

//GCP IMAGE UPLOAD METHOD

const SCOPES = [process.env.SCOPES_0, process.env.SCOPES_1];
const auth = new google.auth.GoogleAuth({
    keyFile: KeyPath,
    scopes: SCOPES
});
console.log(auth);

const uploadToGoogleDrive = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const response = await google.drive({ version: "v3", auth }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: [process.env.GOOGLE_FOLDER_ID],
        },
        fields: "id,name",
    });
    return response.data;
};

router.post(
    "/postitem",
    requireSignin,
    userMiddleware,
    // uploadS3.array("itemPicture") /* AWS S3 Bucket upload method calling */
    upload.any("itemPictures"),
    async (req, res) => {
        // console.log(req)
        console.log("Hitted the POST successfully ");
        try {
            console.log("try");
            const { ItemType, ItemName, Price, Quantity } = req.body;
            // console.log(req.files);
            console.log(ItemType);
            console.log(req.files);
            console.log(req.body);
            const { body, files } = req;
            console.log(body);
            let itemPictures = [];
            for (let f = 0; f < files.length; f += 1) {
                itemPictures.push(await uploadToGoogleDrive(files[f]));
            }
            //Saving data to db

            const newPost = await postitem.create({
                itemname: ItemName,
                itemtype: ItemType,
                itemPictures: itemPictures,
                price: Price,
                availableQuantity: Quantity,
                createdBy: req.user._id,
            });
            console.log(newPost._id);
            await newPost.save();
            console.log("save completed");
            res.status(201).json({ message: "done" });
        } catch (err) {
            console.log(err);
            res.status(401).json({
                "Message is": err.message,
            });
        }
    }
);

router.get("/get-item", async (req, res) => {
    let data = [];
    stateInfo = req.body.stateInfo;
    const url = `https://vegetablemarketprice.com/market/${stateInfo}/today`;
    const response = await fetch(url);
    const body = await response.text()
    const $ = cheerio.load(body);
    console.log("vegetable names");
    $('tr').each((_, e) => {
        let _1 = $(e).find('td:nth-child(2)').text().replace(/(\s+)/g, ' ');
        let _2 = $(e).find('td:nth-child(3)').text().replace(/(\s+)/g, ' ');
        let _3 = $(e).find('td:nth-child(4)').text().replace(/(\s+)/g, ' ');
        let _4 = $(e).find('td:nth-child(5)').text().replace(/(\s+)/g, ' ');
        let _5 = $(e).find('td:nth-child(6)').text().replace(/(\s+)/g, ' ');
        data.push({
            vegetable_names: _1,
            wholesale_price: _2,
            retail_price: _3,
            shoppingmall_price: _4,
            units: _5
        });
    });
    res.json(data);
})

router.get("/getitem", (req, res) => {
    // postitem.find({}).exec((err, postitems) => {
    //     if (err) return res.status(400).json({ err });
    //     if (postitems) {

    //         res.status(200).json({
    //             postitems,
    //         });
    //     }
    // });
    postitem.find({}).exec()
        .then((response) => {
            // console.log(response);
            res.json({
                response
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({ err });
        })
});

router.get("/item/:id", (req, res) => {
    const { id } = req.params;
    // console.log(id)
    postitem.find({ _id: id }).exec((err, item) => {
        if (err) return res.status(400).json({ Error: err });
        // console.log(item)
        messageschema.find({ itemId: item[0]._id }).exec((err, answers) => {
            if (err) return res.status(400).json({ Error: err });

            // console.log(answers)
            res.status(200).json({
                Item: item,
                Answers: answers,
            });
        });
    });
});


router.post("/deleteitem", async (req, res) => {
    const { id } = req.body;
    console.log("Item id is :", id);
    try {
        const deleteitem = await postitem.findOneAndDelete({ _id: id });
        res.status(200).json({
            body: req.body,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(
            {
                "err": "Something went wrong!!"
            }
        )
    }
});

router.get("/getnumber/:id", (req, res) => {
    const { id } = req.params;
    console.log("Id is :", id);
    SignUp.find({ _id: id }).exec((err, user) => {
        res.status(200).json({
            Number: user[0].number,
        });
    });
});

router.get("/getquestion/:id", (req, res) => {
    const { id } = req.params;
    console.log("Id is :", id);
    postitem.find({ _id: id }).exec((err, item) => {
        if (err) return res.status(400).json({ Error: err });

        // console.log(item)
        // console.log(item[0].createdBy)
        const createdBy = item[0].createdBy;
        SignUp.find({ _id: createdBy }).exec((err, user) => {
            res.status(200).json({
                Question: user[0].number,
            });
        });
    });
});

router.post("/submitAnswer", async (req, res) => {
    console.log(req.body);
    const { itemId, question, answer, givenBy, belongsTo } = req.body;


    const newmessage = await messageschema.create({
        itemId: itemId,
        belongsTo: belongsTo,
        question: question,
        answer: answer,
        givenBy: givenBy,
    });
    newmessage.save((error, item) => {
        if (error) return res.status(400).json({ error });
        if (item) return res.status(201).json({ item });
    });
});

router.get("/myresponses/:id", (req, res) => {
    const { id } = req.params;
    console.log("Used Id is :", id);
    messageschema.find({ givenBy: id }).exec((err, item) => {
        if (err) return res.status(400).json({ Error: err });

        console.log(item);
        res.status(200).json({
            item: item,
        });
    });
});

router.get("/mylistings/:id", (req, res) => {
    const { id } = req.params;
    console.log("Used Id is :", id);
    postitem.find({ createdBy: id }).exec((err, item) => {
        if (err) return res.status(400).json({ Error: err });

        // console.log(item)
        res.status(200).json({
            item: item,
        });
    });
});

router.post("/confirmResponse/:id", (req, res) => {
    const { id } = req.params;
    // console.log("Used Id is :",id)
    console.log(id);
    console.log(req.body);
    messageschema.updateOne(
        { _id: id },
        { $set: { response: req.body.response } },
        { upsert: false },
        (err, updatedMessage) => {
            if (err) return res.status(400).json({ msg: err });

            res.status(200).json({ msg: "Updated" });
        }
    );
});
module.exports = router;
