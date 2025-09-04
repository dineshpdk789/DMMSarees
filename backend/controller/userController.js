
const { User } = require("../modals/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { log } = require("console");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary").v2;


//register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const Avatar=req.files?.avatar;

        //validting field
        if (!name || !email || !password || !Avatar) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        //password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be 8 characters"
            })
        }


        const myCloud = await cloudinary.uploader.upload(req.files?.avatar.tempFilePath, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        })


        //hash password
        const hashpassword = await bcrypt.hash(password, 10);
        //creting user
        const user = await User.create({
            name,
            email,
            password: hashpassword,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        })
        //sending token to browser
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "3d" });
        res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        return res.status(201).json({
            success: true,
            user,
            token
        })

    }
    catch (error) {
        // For Mongoose validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages[0]
            });
        }
        //  Custom error for duplicate email
        if (error.code === 11000 && error.keyValue.email) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered. Please use a different email."
            });
        }
        //other error
        return res.status(404).json({
            success: false,
            message: error.message
        })

    }



}

//Login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        console.log(email, password);


        if (!email) {
            throw new Error("Email cannot be empty");
        }
        if (!password) {
            throw new Error("Password cannot be empty");
        }

        const user = await User.findOne({ email }).select("+password");
        console.log(user);

        if (!user) {
            throw new Error("User not exist.Please enter valid email");
        }

        // const match=await bcrypt.compare(password,user.password);
        const isPasswordValid = await user.verifyPassword(password);
        console.log(isPasswordValid);

        if (!isPasswordValid) {
            throw new Error("Please enter valid email or password");
        }

        //send jwt token to the user
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "3d" });
        res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })


        return res.status(200).json({
            success: true,
            user,
            token
        })


    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        })

    }


}
//logout
const logout = async (req, res) => {

    try {

        res.cookie("token", null, { maxAge: 0, httpOnly: true });

        return res.status(200).json({
            success: true,
            message: "Successfully logged out"
        })

    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Problem occures during logout"
        })
    }



}


//requestresetpassword
const requestresetPassword = async (req, res) => {
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Hash token and set fields
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

        await user.save({ validateBeforeSave: false });

        const resetPasswordURL = `${process.env.FRONTEND_URL}/reset/${resetToken}`;
        const message = `Use the following link to reset your password: ${resetPasswordURL}.\n\nThis link will expire in 5 minutes.\n\nIf you did not request a password reset, please ignore this message`;

        // Try sending the email
        try {
            await sendEmail({
                email: user.email,
                subject: "Password reset request",
                message: message
            });

            return res.status(200).json({
                success: true,
                message: `Email is sent to ${user.email}`
            });
        } catch (emailError) {
            // Clean up token if email fails
            console.log(emailError);

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });

            return res.status(500).json({
                success: false,
                message: "Failed to send email"
            });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

//resetpassword
const resetPassword = async (req, res) => {

    try {
        const tokenid = req.params.token;
        const { password, confirmPassword } = req.body;


        //password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be 8 characters"
            })
        }

        const resetPasswordToken = crypto.createHash("sha256").update(tokenid).digest("hex");
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })
        if (!user) {
            throw new Error("reset Password token is invalid or has been expired")
        }


        if (password != confirmPassword) {
            throw new Error("Password not  match")
        }
        //storing newpassword to database
        const hashpassword = await bcrypt.hash(password, 10);
        user.password = hashpassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })



    } catch (error) {
        console.log(error);

        return res.status(404).json({
            success: false,
            message: error.message
        })
    }

}
//Get user details
const fetchProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })

}
//update password
const updatePassword = async (req, res) => {
    try {
        const { oldpassword, newpassword, confirmPassword } = req.body;
        const user = await User.findById(req.user._id).select("+password");

        const verifypassword = await bcrypt.compare(oldpassword, user.password);

        if (!verifypassword) {
            return res.status(400).json({
                success: false,
                message: "Enter valid previous password"
            })
        }

        if (newpassword != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Confirm password not matched"
            })
        }

        user.password = await bcrypt.hash(newpassword, 10);

        await user.save({ validateBeforeSave: false });



        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })



    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


//updateprofile
const updateProfile = async (req, res) => {


    try {

        const { name, email} = req.body;
        const updateUserDetails = {
            name,
            email
        }
        

        //  Handle Cloudinary upload ONLY if a new avatar was submitted
        if (req.files?.avatar) {
            const currentUser = await User.findById(req.user._id);

            // Destroy the old image if it exists
            if (currentUser.avatar && currentUser.avatar.public_id) {
                const imageId = currentUser.avatar.public_id;
                await cloudinary.uploader.destroy(imageId);
            }

            // Upload the new image
            const myCloud = await cloudinary.uploader.upload(req.files?.avatar.tempFilePath, {
                folder: "avatars",
                width: 150,
                crop: "scale",
            });

            // Add the new avatar details to the update object
            updateUserDetails.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }


        //  Check if email is changing
        if (email) {
            const existingUser = await User.findOne({ email });

            //  If found user with same email but it's not the current user
            if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
                return res.status(400).json({
                    success: false,
                    message: "Email is already registered",
                });
            }
        }

        const user = await User.findByIdAndUpdate(req.user._id, updateUserDetails, { new: true, runValidators: true });

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to update profile"

        })
    }

}
//admin getting user information
const getUsersList = async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        message: "Fetched all users successfully",
        users
    })
}
//admin getting single user information
const getSingleUser = async (req, res) => {
    try {

        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({
                success: false,
                messaage: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Fetched user successfully",
            user
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            messaage: "some error occured"
        })
    }
}

//Admin chaging user role
const updateUserRole = async (req, res) => {
    const id = req.params.id;
    const { role } = req.body;
    const newUserData = {
        role
    }
    const user = await User.findByIdAndUpdate(id, newUserData, {
        new: true,
        runValidators: true
    })

    if (!user) {
        res.status(400).json({
            success: true,
            message: "User does not exist "
        })
    }

    res.status(200).json({
        success: true,
        message: "User role updated successfully",
        user
    })
}
//Admin delete the user
const deleteUser = async (req, res) => {
    const id = req.params.id;
     const user = await User.findById(id);

     //removing image form cloudinary 
    const imageId=user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);
    const deleted = await User.findByIdAndDelete(id);
    if (!user) {
        res.status(404).json({
            success: true,
            messaage: "User does not exist"
        })
    }
   
    res.status(200).json({
        success: true,
        messaage: "Successfully deleted the user"
    })
}


module.exports = {
    registerUser, loginUser,
    logout, requestresetPassword, resetPassword,
    fetchProfile, updatePassword, updateProfile,
    getUsersList, getSingleUser, updateUserRole, deleteUser,
    // contact us handler injected below
};

// Contact Us - public endpoint handler
module.exports.contactUs = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const adminEmail = process.env.CONTACT_TO || "pdk7893@gmail.com";
        const composedMessage = `New contact form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        await sendEmail({
            email: adminEmail,
            subject: "New contact form submission",
            message: composedMessage
        });

        return res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to send message" });
    }
}