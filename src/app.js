const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
let password = process.env.PASSWORD;

console.log(password);
const authorInfo = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'tusharst30999@gmail.com',
        pass: password
    }
});


const menus = {
    'Vada-Pav': { name: 'Vada-Pav', price: 20 },
    'Misal': { name: 'Misal', price: 20 },
    'Dosa': { name: 'Dosa', price: 20 },
    'Uttappa': { name: 'Uttappa', price: 20 },
    'Burger': { name: 'Burger', price: 20 },
    'Pizza': { name: 'Pizza', price: 20 },
    'Paneer': { name: 'Paneer', price: 20 },
    'Vada-Sample': { name: 'Vada-Sample', price: 20 },
    'Pohe': { name: 'Pohe', price: 20 },
    'Khichadi': { name: 'Khichadi', price: 20 },
    'Upama': { name: 'Upama', price: 20 },
    'Sandwich': { name: 'Sandwich', price: 20 },
    'Mutter': { name: 'Mutter', price: 20 },
    'Chicken': { name: 'Chicken', price: 20 },
    'Tawa-Pulav': { name: 'Tawa-Pulav', price: 20 },
    'Rice': { name: 'Rice', price: 20 },
    'Fried-Rice': { name: 'Fried-Rice', price: 20 },
    'Paneer-Rice': { name: 'Paneer-Rice', price: 20 },
    'Mushrrom-Rice': { name: 'Mushrrom-Rice', price: 20 },
    'Biryani': { name: 'Biryani', price: 20 }
}

const handleSendMail = function (req, res) {
    const { customerEmail, customerName, selectedMenus } = req.body;
    let orderedMenu = selectedMenus.map(e => menus[e]);
    let totalPrice = orderedMenu.reduce((a, b) => {
        return a.price + b.price;
    }, 0)
    orderedMenu.push({ "Total Pirce": totalPrice });

    const mailInfo = {
        from: 'Tushar Tambe <tusharst30999@gmail.com>',
        to: customerEmail,
        subject: 'Restaurent Bill',
        text: JSON.stringify(orderedMenu)
    }


    authorInfo.sendMail(mailInfo, function (error, info) {
        if (error) {
            console.log(error);
            res.send({ status: "not sent" })
        } else {
            res.send({ status: "sent" });
        }
    });
};

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.post('/sendMail', handleSendMail)

app.use(express.static('public', { extensions: ['html'] }));
module.exports = app;