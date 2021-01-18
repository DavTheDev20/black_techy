const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./routes/router');
const Post = require('./models/post');

const app = express();
const port = 8080;

mongoose.connect('mongodb://localhost:27017/black_techyDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to black_techyDB');
});

app.use(morgan('tiny'));
app.use(cors());
app.use('/api', router);

app.listen(port, () => console.log(`Server runnning on port: ${port}`));

