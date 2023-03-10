const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routers/tourRouter');
const userRouter = require('./routers/userRouter');

const app = express();

/* 1) MIDDLEWARES */
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));

    console.log("development");
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((request, response, next) => {
    console.log('Hello from the middleware.');

    next();
});

app.use((request, response, next) => {
    request.requestTime = new Date().toISOString();

    next();
});

/* 2) ROUTE HANDLERS */

/* 3) ROUTERS */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

/* 4) START SERVER */

module.exports = app;
