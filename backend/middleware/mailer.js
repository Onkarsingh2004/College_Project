const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "glamsphere.asr@gmail.com",
    pass: "bvxi ahay fduh bbmu",
  },
});

async function main(to_, subject, message) {
  const info = await transporter.sendMail({
    from: "glamsphere.asr@gmail.com",
    to: to_,
    subject: subject,
    html: message,
  });

  console.log("Message sent: %s", info.messageId);
}
module.exports.main = main;

// main().catch(console.error);

