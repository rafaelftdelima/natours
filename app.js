const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

/* 1) MIDDLEWARES */

app.use(morgan('dev'));
app.use(express.json());

app.use((request, response, next) => {
    console.log('Hello from the middleware.');

    next();
});

app.use((request, response, next) => {
    request.requestTime = new Date().toISOString();

    next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

/* 2) ROUTE HANDLERS */

const getAllTours = (request, response) => {
    console.log(request.requestTime);

    response.status(200).json({
        status: 'success',
        requestAt: request.requestTime,
        results: tours.length,
        data: {
            tours,
        },
    });
};

const getTour = (request, response) => {
    console.log(request.params);

    const id = request.params.id * 1;
    const tour = tours.find((element) => element.id === id);

    if (!tour) {
        return response.status(404).json({
            status: 'fail',
            message: 'invalid id',
        });
    }

    response.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tour,
        },
    });
};

const createTour = (request, response) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, request.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (error) => {
        response.status(201).json({
            status: 'sucsess',
            data: {
                tour: newTour,
            },
        });
    });
};

const updateTour = (request, response) => {
    if (request.params.id * 1 > tours.length) {
        return response.status(404).json({
            status: 'fail',
            message: 'invalid id',
        });
    }
    response.status(200).json({
        status: 'success',
        data: {
            tour: '<Uptading tour here...>',
        },
    });
};

const deleteTour = (request, response) => {
    if (request.params.id * 1 > tours.length) {
        return response.status(404).json({
            status: 'fail',
            message: 'invalid id',
        });
    }
    response.status(204).json({
        status: 'success',
        data: null,
    });
};

/* 3) ROUTERS */

app.route('api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

/* 4) START SERVER */

const port = 1111;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
