const fs = require('fs');
const { request, response } = require('express');
const express = require('express');

const app = express();
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

const patchTour = (request, response) => {
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

app.get('api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', patchTour);
app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours);

const port = 1111;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
