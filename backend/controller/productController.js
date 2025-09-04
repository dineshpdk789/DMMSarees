const { Product } = require("../modals/productModel");
const { APIFunctionality } = require("../utils/apiFunctionality");
const cloudinary = require("cloudinary").v2;
 const fs = require('fs');
//create product (admin)
const createProducts = async (req, res) => {
    
     try {
        let images = [];

        if (req.files && req.files.images) {
            if (Array.isArray(req.files.images)) {
                images = req.files.images; // multiple files
            } else {
                images.push(req.files.images); // single file
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "No images uploaded"
            });
        }

        const imagelinks = [];
        for (let i = 0; i < images.length; i++){
            const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
                folder: "products"
            });
            imagelinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });
             fs.unlinkSync(images[i].tempFilePath);
        }

        req.body.image = imagelinks;
        req.body.user = req.user._id;

        const product = await Product.create(req.body);

        return res.status(201).json({
            success: true,
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//getallproduct
const getAllProducts = async (req, res) => {
    try {

        //search
        const { name, category, sort } = req.query;
        const queryObject = {};

        if (name) {
            // queryObject.name=name;->this line will not treat case sensitivity
            queryObject.name = { $regex: name, $options: "i" };
        }
        if (category) {
            queryObject.category = { $regex: category, $options: "i" };
        }



        //sort 
        const sortOption = {};

        if (sort === "lowprice") {
            sortOption.price = 1;
        }
        else if (sort === 'highprice') {
            sortOption.price = -1;
        } else if (sort === 'latest') {
            sortOption.createdAt = -1;
        } else if (sort === 'oldest') {
            sortOption.createdAt = 1;
        }


        //   Count total documents in collect (filtered or not)
        const productCount = await Product.countDocuments(queryObject);

        let productsQuery = Product.find(queryObject);
        //  Apply sorting only if sortOption is not empty
        if (Object.keys(sortOption).length > 0) {
            productsQuery = productsQuery.sort(sortOption);
        }


        //pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 15;

        const skip = (page - 1) * limit;

        productsQuery = productsQuery.skip(skip).limit(limit);



        const products = await productsQuery;

        //totalpages
        const totalPages = Math.ceil(productCount / limit);
        //error if page acceesing number  >totalpages 
        if (page > totalPages && productCount > 0) {
            return res.status(404).json({
                success: false,
                message: "This page doesnot exist"
            })
        }
        //no products found (optional)
        if (productCount == 0) {
            return res.status(404).json(
                {
                    success: true,
                    message: "No product found",
                    products: [],
                    productCount: 0,
                    totalPages: 0,
                    currentPage: page,
                    limit
                }
            )

        }
        // send actual data
        res.status(200).json({
            success: true,
            products,
            productCount,
            totalPages,
            currentPage: page,
            limit
        })

    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: "No product Found"
        })
    }
}

//update product
const updateProduct = async (req, res) => {
    // try {

    //     const id = req.params.id;
    //     let product = await Product.findById(id)

    //     let image = [];
    //     if (typeof req.body.images === "string") {
    //         image.push(req.body.images)
    //     }
    //      else if (Array.isArray(req.body.images)) {
    //         image = req.body.images;
    //     }
        
    //     const imagelinks = [];
    //     if (image.length > 0) {
    //         for (let i = 0; i < product.image.length; i++) {
    //             await cloudinary.uploader.destroy(product.image[i].public_id)
    //         }
    //         for (let i = 0; i < image.length; i++) {
    //             const result = await cloudinary.uploader.upload(image[i], {
    //                 folder: "products"
    //             })
    //             imagelinks.push({
    //                 public_id: result.public_id,
    //                 url: result.secure_url
    //             })
    //         }
    //          req.body.image = imagelinks;
    //     }

       

    //     //extracting user id to store in product body in user field as in productmodel
    //     req.body.user = req.user._id;


    //     product = await Product.findByIdAndUpdate(id, req.body, {
    //         new: true,
    //         runValidators: true
    //     })

    //     if (!product) {
    //         return res.status(404).json({
    //             success: false,
    //             message: "Product not found"
    //         })
    //     }


    //     return res.status(200).json({
    //         success: true,
    //         product
    //     })


    // }
    // catch (error) {

    //     return res.status(404).json({
    //         success: false,
    //         message:error.message
    //     })

    // }

     try {
        const id = req.params.id;
        let product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let images = [];

        // if only one image uploaded, req.files.images will be an object
        if (req.files && req.files.images) {
            if (Array.isArray(req.files.images)) {
                images = req.files.images;
            } else {
                images.push(req.files.images);
            }
        }

        // If new images are uploaded, first delete old ones from cloudinary
        if (images.length > 0) {
            for (let i = 0; i < product.image.length; i++) {
                await cloudinary.uploader.destroy(product.image[i].public_id);
            }

            // Upload new images using tempFilePath
            const imagelinks = [];
            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
                    folder: "products"
                });

                imagelinks.push({
                    public_id: result.public_id,
                    url: result.secure_url
                });

                // Remove the temp file from server after upload
                fs.unlinkSync(images[i].tempFilePath);
            }

            // Assign new image links to req.body
            req.body.image = imagelinks;
        }

        // Store user id in product data
        req.body.user = req.user._id;

        // Update product
        product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        return res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//delete product
const deleteProduct = async (req, res) => {
    try {

        const id = req.params.id;
        let product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        const deleted = await Product.findByIdAndDelete(id);

        for(let i=0;i<product.image.length;i++){
            await cloudinary.uploader.destroy(product.image[i].public_id)
        }

        return res.status(200).json({
            success: true,
            message: "product deleted successfully",
            product:deleted
        })


    } catch (error) {

        res.status(404).json({
            success: false,
            message: "some error occured"
        })

    }
}
//getsingle product
const getsingleProduct = async (req, res) => {
    try {

        const id = req.params.id;
        let product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        return res.status(200).json({
            success: true,
            product
        })

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: "some error occured"
        })


    }

}
//creating and updating review
const createReviewForProduct = async (req, res) => {
    const { comment, productId } = req.body;
    const curruntreview = {
        user: req.user._id,
        name: req.user.name,
        comment: comment
    }
    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    const reviewExists = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if (reviewExists) {
        reviewExists.comment = comment;
    }
    else {
        product.reviews.push(curruntreview);
        product.numofReviews = product.reviews.length;
    }


    let avg = 0;
    product.reviews.forEach(review => {
        avg += review.rating
    })


    product.ratings = product.reviews.length > 0 ? Number((avg / product.reviews.length).toFixed(1)) : 0;


    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Review Submitted Successfully",
        product
    })

}
//getting user review
//getting user review
const getProductReviews = async (req, res) => {
    try { // <-- ADD TRY
        const product = await Product.findById(req.params.id); // Use req.query.id if it's a query param

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            reviews: product.reviews
        });

    } catch (error) { // <-- ADD CATCH
        return res.status(500).json({
            success: false,
            message: "Server error: " + error.message
        });
    }
};
//Deleting review
const deleteReview = async (req, res) => {
    const product = await Product.findById(req.query.productid);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    //filtering product
    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

    //after deleting review again calcualate no.of reviews remains

  
    product.reviews = reviews;
    product.numofReviews = reviews.length;

    await product.save({ validateBeforeSave: false });


    res.status(200).json({
        success:true,
        message:"Review deleted successfully"
    });

}
//Admin-Getting all products
const getAdminProducts = async (req, res) => {
    const products = await Product.find();
    return res.status(200).json({
        success: true,
        message: "Fetched product successfully",
        products
    })
}

module.exports = {
    createProducts, getAllProducts
    , updateProduct, deleteProduct, getsingleProduct
    , getAdminProducts, createReviewForProduct, getProductReviews, deleteReview
};





//    const apiFunctionality= new APIFunctionality(Product.find(),req.query).search();
//    console.log(apiFunctionality);
// const products = await apiFunctionality.query;
