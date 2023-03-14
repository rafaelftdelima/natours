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

const port = process.env.PORT || 1111;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});