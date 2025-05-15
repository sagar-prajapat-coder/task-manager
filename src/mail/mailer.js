import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const sendEmail = async (to, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email app password
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: to, // Recipient's email
      subject: subject,
      text: text, // Email body (plain text)
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
