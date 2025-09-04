
const jwt = require("jsonwebtoken");
const { User } = require("../modals/userModel");
const verifyUserAuth = async (req, res, next) => {
   try {

      //extracting token from send by browser
      const { token } = req.cookies;
      
      if (!token) {
         throw new Error("Please login to continue");
      }
      //verifying token
      const decodeData = jwt.verify(token, process.env.SECRET_KEY);
      

      req.user = await User.findById(decodeData.id);

      next();

   } catch (error) {
      return res.status(401).json({
         success: false,
         message: error.message
      })
   }

}

const roleBasedAccess = (...roles) => {

   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         return res.status(404).json({
            success: false,
            message: `${req.user.role} is not allowed to access the resource`
         })
      }
      next();
   }

}
module.exports = { verifyUserAuth, roleBasedAccess };