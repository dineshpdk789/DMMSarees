const nodeMailer=require("nodemailer");
const sendEmail=async(options)=>{
const transporter=nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:"pdk7893@gmail.com",
        pass:process.env.SMTP_PASS
    }
})

const mailOptions={
    from:"pdk7893@gmail.com",
    to:options.email,
    subject:options.subject,
    text:options.message
}
//sendMail is method
await transporter.sendMail(mailOptions);

}

module.exports=sendEmail;