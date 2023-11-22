import express from 'express';
import nodemailer from 'nodemailer';
const app = express();
const port = 3000;

const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: "wb.todo@mail.ru",
        pass: "EuJPaiuI*i22",
    },
});

const mail = (data) => {
    const mailOptions = {
        from: "wb.todo@mail.ru",
        to: data.email,
        subject: data.subject,
        text: data.text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

app.post('/sendEmail', (req, res) => {
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
