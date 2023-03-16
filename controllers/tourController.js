const Tour = require('./../models/tourModel');

exports.getAllTours = (request, response) => {
    response.status(200).json({
        status: 'success',
        requestedAt: request.requestTime
    });
};

exports.getTour = (request, response) => {
    response.status(200).json({
        status: 'success'
    });
};

exports.createTour = (request, response) => {
    response.status(201).json({
        status: 'success'
    });
};

exports.updateTour = (request, response) => {
    response.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
};

exports.deleteTour = (request, response) => {
    response.status(204).json({
        status: 'success',
        data: null
    });
};
