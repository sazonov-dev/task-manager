const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const port = 3050;

const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: "wb.todo@mail.ru",
        pass: "m3an2q35tajCDccuF3Lc",
    },
});

const mail = (data) => {
    const mailOptions = {
        from: "wb.todo@mail.ru",
        to: data.email,
        subject: data.subject,
        html: data.html,
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
    const {html, email, subject} = req.body;
    mail({html, email, subject})
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    console.log('123')
})

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
