let url;
if (process.env.NODE_ENV === 'production') {
  url = process.env.DB_URL;
} else {
  url = 'mongodb://mongo:27017';
}

module.exports = {
  mongoURI: url
}
