const nodemailer = require ("nodemailer")

const sendMail = async (email, userName)=>{
    const contactTemplate = `
    Welcome  there ${userName}, welocme to your website
    `

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL,
            pass: process.env.PASS
    
        },
    })
    
    const mailOption = {
        from: process.env.GMAIL,
        to: email,
        subject: "PGI  ----Welcome Messege",
        text: "PGI",
        html: contactTemplate,
    };
    try{
        await transporter.sendMail(mailOption);
    
    }catch (error){
        console.log("Error in sending Mail");
        throw error
    }
}


module.exports = {sendMail}