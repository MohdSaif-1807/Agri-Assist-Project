const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ItemSchema = new Schema(
    {
        itemname: {
            type: String,
            required: true,
            index: {
                sparse: true
            }
        },
        itemtype: {
            type: String,
            required: true,
            index: {
                sparse: true
            }
        },
        itemPictures: [
            {
                id: {
                    type: String
                },
                name: {
                    type: String
                }
            }
        ],
        price: {
            type: Number,
            required: true,
            index: {
                sparse: true
            }
        },
        availableQuantity: {
            type: Number,
            required: true,
            index: {
                sparse: true
            }
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RegisterSchema",
            required: true,
            index: {
                sparse: true
            }
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    },
    {
        timestamps: {
            currentTime: () => Date.now()
        },
    }
);

const PostItem = mongoose.model("PostItem", ItemSchema);
module.exports = PostItem;
