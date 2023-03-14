const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>', process.env.DATABASE_PASSWORD
);

/* DATABASE LOCAL */
/* mongoose.connect(process.env.DATABASE_LOCAL).then(
    () => console.log('DB connection successful')
); */

/* DATABASE FROM ATLAS */
mongoose.connect(DB).then(() => {
    console.log('DB connection successful');
});

/* console.log(process.env); */

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    rating: {
        type: Number,
        default: 4.5
    }
}, {
    versionKey: false
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: 'The Forest Hiker',
    rating: 4.7,
    price: 297
});

testTour.save().then(document => {
    console.log(document);
}).catch(error => {
    console.log('Error:', error);
});

const port = process.env.PORT || 1111;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});