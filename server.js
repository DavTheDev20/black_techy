const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./routes/router');
const Post = require('./models/post');

const app = express();
//Step one in heroku deployment
const port = process.env.PORT || 8080;

//Step two in heroku deployment
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/black_techyDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to black_techyDB');
});

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', router);

//Step three in heroku deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build/'));
}

app.listen(port, () => console.log(`Server runnning on port: ${port}`));

