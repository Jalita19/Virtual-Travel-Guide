// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Sample in-memory data
let destinations = [
    { id: 1, name: 'Paris', description: 'The city of lights.' },
    { id: 2, name: 'New York', description: 'The city that never sleeps.' }
];

// RESTful API endpoints

// Get all destinations
app.get('/api/destinations', (req, res) => {
    res.json(destinations);
});

// Get a single destination by ID
app.get('/api/destinations/:id', (req, res) => {
    const destination = destinations.find(d => d.id === parseInt(req.params.id));
    if (!destination) return res.status(404).send('Destination not found');
    res.json(destination);
});

// Create a new destination
app.post('/api/destinations', (req, res) => {
    const newDestination = {
        id: destinations.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    destinations.push(newDestination);
    res.status(201).json(newDestination);
});

// Update a destination
app.put('/api/destinations/:id', (req, res) => {
    const destination = destinations.find(d => d.id === parseInt(req.params.id));
    if (!destination) return res.status(404).send('Destination not found');
    
    destination.name = req.body.name;
    destination.description = req.body.description;
    res.json(destination);
});

// Delete a destination
app.delete('/api/destinations/:id', (req, res) => {
    const index = destinations.findIndex(d => d.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Destination not found');
    
    destinations.splice(index, 1);
    res.status(204).send();
});

// Render the destinations view
app.get('/', (req, res) => {
    res.render('index', { destinations });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});