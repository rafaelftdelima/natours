/* const fs = require('fs'); */
const Tour = require('./../models/tourModel');

/* const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)); */

/* exports.checkID = (request, response, next, value) => {
    console.log(`Tour id is: ${value}`);
    if (request.params.id * 1 > tours.length) {
        return response.status(404).json({
            status: 'fail',
            message: 'invalid id',
        });
    }
    next();
} */

exports.checkBody = (request, response, next) => {
    if (!request.body.name || !request.body.price) {
        return response.status(400).json({
            status: 'fail',
            message: 'missing name or price',
        });
    }
    next();
}

exports.getAllTours = (request, response) => {
    console.log(request.requestTime);

    response.status(200).json({
        status: 'success',
        requestAt: request.requestTime,
        /* results: tours.length,
        data: {
            tours,
        }, */
    });
};

exports.getTour = (request, response) => {
    console.log(request.params);

    const id = request.params.id * 1;
    /* const tour = tours.find((element) => element.id === id);

    if (!tour) {
        return response.status(404).json({
            status: 'fail',
            message: 'invalid id',
        });
    } */

    /* response.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tour,
        },
    }); */
};

exports.createTour = (request, response) => {
    /* const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, request.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (error) => {
        response.status(201).json({
            status: 'sucsess',
            data: {
                tour: newTour,
            },
        });
    }); */

    response.status(201).json({
        status: 'sucsess',
        /* data: {
            tour: newTour,
        }, */
    });
};

exports.updateTour = (request, response) => {
    response.status(200).json({
        status: 'success',
        data: {
            tour: '<Uptading tour here...>',
        },
    });
};

exports.deleteTour = (request, response) => {
    response.status(204).json({
        status: 'success',
        data: null,
    });
};