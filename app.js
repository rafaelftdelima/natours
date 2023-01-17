const { request } = require('express');
const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.status(200).json({ message: 'Hello from the server-side!', app: 'Natours' });
});

app.post('/', (request, response) => {
    response.send('You can post to the endpoint...');
});

const port = 1111;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
