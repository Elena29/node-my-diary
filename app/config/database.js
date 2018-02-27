let url;
if (process.env.NODE_ENV === 'production') {
    url = 'mongodb://<DB_USERNAME>:<DB_PASSWORD>@ds245238.mlab.com:45238/story-book';
} else {
    url = 'mongodb://mongo:27017';
}

module.exports = {
    mongoURI: url
}