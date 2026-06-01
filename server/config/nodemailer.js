import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});
transporter.verify((error, success) => {
    if (error) {
        console.log("VERIFY ERROR:", error);
    } else {
        console.log("SMTP Ready");
    }
});

export default transporter;