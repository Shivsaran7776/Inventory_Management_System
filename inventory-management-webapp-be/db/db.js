const mongoose = require('mongoose');

function dbConnect(){
    mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
    console.log('Connected to MongoDB');
    }).catch((err) => {
    console.error('Error connecting to MongoDB', err);
    });
}

module.exports = {dbConnect};