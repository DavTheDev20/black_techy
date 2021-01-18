require('dotenv').config()
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

const password = process.env.ATLAS_PASS;

//Step two in heroku deployment
mongoose.connect(`mongodb+srv://admin-davin:${password}@cluster0.ol1ih.mongodb.net/black_techyDB?retryWrites=true&w=majority`, {
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

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server runnning on port: ${port}`));

