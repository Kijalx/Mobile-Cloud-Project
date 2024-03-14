const path = require('path');
const mongoose = require('mongoose')

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const shopRoutes = require('./routes/shop');
const signupRoutes = require('./routes/signup');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', shopRoutes);
app.use('/', signupRoutes);

app.use((req, res, next) => {
    //  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://kijalx:9ssUoCtJGZOYgtHV@fullstack.xfqaiwz.mongodb.net/?retryWrites=true&w=majority&appName=FullStack')
    .then(res => {
        app.listen(3000)
    })
    .catch(err => {
        console.log('Mongoose connection error: ' + err)
    });
