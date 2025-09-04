const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Please enter product description"],
    },

    price: {
        type: Number,
        require: [true, "Please enter product price"],
        maxLength: [7, "Price cannot exceed 7 digits"]
    },
    
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }

    ],

    category: {
        type: String,
        required: [true, "Please Enter product category"],
    },

    stock: {
        type: Number,
        required: [true, "please enter product stock"],
        maxLength: [5, "price cannot exceed 5 digits"],
        default: 1
    },

    numofReviews: {
        type: Number,
        default: 0
    },

    reviews: [
        {

            user:{
                type:mongoose.Schema.ObjectId,
                ref:"user",
                required:true
            },
            name: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }

        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]

})

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };