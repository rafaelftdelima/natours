const Tour = require('./../models/tourModel');

exports.getAllTours = async (request, response) => {
    try {
        const tours = await Tour.find()

        response.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (error) {
        response.status(404).json({
            status: 'fail',
            message: error
        });
    }
};

exports.getTour = (request, response) => {
    response.status(200).json({
        status: 'success'
    });
};

exports.createTour = async (request, response) => {
    try {
        const newTour = await Tour.create(request.body);

        response.status(201).json({
            status: 'success',
            data: {
                newTour
            }
        });
    } catch (error) {
        response.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        })
    }
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
