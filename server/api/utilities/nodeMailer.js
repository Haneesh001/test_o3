require("dotenv").config();
const nodemailer = require("nodemailer");


const user = "usermail"; //User Gmail
const pass = "userPassword"; //User Gmail Password

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>You Have sucessfully created the account</p>
        
        </div>`,
  }).catch(err => console.log(err));
};