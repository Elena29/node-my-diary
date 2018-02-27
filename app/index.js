const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');

//Passport config
require('./config/passport')(passport);

//Load routes
const auth = require('./routes/auth');

//Map global promises
mongoose.Promise = global.Promise;

// Connect to mongoose
const db = require('./config/database');
mongoose.connect(db.mongoURI)
    .then(() => {
        console.log('MongoDb Connected... ')
    })
    .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Test text');
});


app.use('/auth', auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});