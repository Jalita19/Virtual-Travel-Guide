// server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const multer = require('multer');
// const logger = require('./middleware/logger');
// const authenticate = require('./middleware/authenticate');
// const errorHandler = require('./middleware/errorHandler');


// const app = express();
// const port = 3000;

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'public/images/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     }
//   });
  
//   const upload = multer({ storage });
  
// // Middleware to parse URL-encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files (like images)
// app.use(express.static(path.join(__dirname, 'public')));

// // Set EJS as the template engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Use custom logger middleware globally
// app.use(logger);
// app.use(express.json());

// // Use authenticate middleware for specific routes
// app.use('/api/private', authenticate);

// // Sample data for destinations, users, and comments
// const destinations = [
//   { id: 1, name: 'Paris', description: 'The city of lights.', image: '/images/paris.jpg' },
//   { id: 2, name: 'New York', description: 'The city that never sleeps.', image: '/images/newyork.jpg' },
//   { id: 3, name: 'Tokyo', description: 'The bustling capital of Japan.', image: '/images/tokyo.jpg' }
// ];

// const users = [
//   { id: 1, username: 'john_doe', email: 'john@example.com' },
//   { id: 2, username: 'jane_smith', email: 'jane@example.com' }
// ];

// const comments = [
//   { id: 1, destinationId: 1, userId: 1, text: 'Amazing city!' },
//   { id: 2, destinationId: 2, userId: 2, text: 'I love the skyscrapers!' }
// ];

// // Routes for destinations
// app.get('/', (req, res) => {
//     const { name } = req.query;
//     let filteredDestinations = destinations;
//     if (name) {
//       filteredDestinations = destinations.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
//     }
//     res.render('index', { destinations: filteredDestinations });
//   });
  
//   app.get('/destination/:id', (req, res) => {
//     const destination = destinations.find(d => d.id == req.params.id);
//     const destinationComments = comments.filter(c => c.destinationId == req.params.id);
//     res.render('destination', { destination, comments: destinationComments });
//   });
  
//   // API endpoints for destinations
//   app.get('/api/destinations', (req, res) => {
//     const { name } = req.query;
//     let filteredDestinations = destinations;
//     if (name) {
//       filteredDestinations = destinations.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
//     }
//     res.json(filteredDestinations);
//   });
  
//   app.get('/api/destination/:id', (req, res) => {
//     const destination = destinations.find(d => d.id == req.params.id);
//     if (destination) {
//       res.json(destination);
//     } else {
//       res.status(404).json({ message: 'Destination not found' });
//     }
//   });
  
//   app.post('/api/destination', (req, res) => {
//     const { name, description, image } = req.body;
//     const newId = destinations.length + 1;
//     const newDestination = { id: newId, name, description, image };
//     destinations.push(newDestination);
//     res.status(201).json(newDestination);
//   });
  
//   app.patch('/api/destination/:id', (req, res) => {
//     const { name, description, image } = req.body;
//     const destination = destinations.find(d => d.id == req.params.id);
//     if (destination) {
//       if (name) destination.name = name;
//       if (description) destination.description = description;
//       if (image) destination.image = image;
//       res.json(destination);
//     } else {
//       res.status(404).json({ message: 'Destination not found' });
//     }
//   });
  
//   app.delete('/api/destination/:id', (req, res) => {
//     const index = destinations.findIndex(d => d.id == req.params.id);
//     if (index !== -1) {
//       destinations.splice(index, 1);
//       res.status(204).end();
//     } else {
//       res.status(404).json({ message: 'Destination not found' });
//     }
//   });
  
//   // Routes for users
//   app.get('/users', (req, res) => {
//     res.render('users', { users });
//   });
  
//   app.get('/api/users', (req, res) => {
//     res.json(users);
//   });
  
//   app.get('/api/user/:id', (req, res) => {
//     const user = users.find(u => u.id == req.params.id);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   });
  
//   app.post('/api/user', (req, res) => {
//     const { username, email } = req.body;
//     const newId = users.length + 1;
//     const newUser = { id: newId, username, email };
//     users.push(newUser);
//     res.status(201).json(newUser);
//   });
  
//   app.patch('/api/user/:id', (req, res) => {
//     const { username, email } = req.body;
//     const user = users.find(u => u.id == req.params.id);
//     if (user) {
//       if (username) user.username = username;
//       if (email) user.email = email;
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   });
  
//   app.delete('/api/user/:id', (req, res) => {
//     const index = users.findIndex(u => u.id == req.params.id);
//     if (index !== -1) {
//       users.splice(index, 1);
//       res.status(204).end();
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   });
  
//   // Routes for comments
//   app.get('/comments', (req, res) => {
//     res.render('comments', { comments });
//   });
  
//   app.get('/api/comments', (req, res) => {
//     res.json(comments);
//   });
  
//   app.get('/api/comment/:id', (req, res) => {
//     const comment = comments.find(c => c.id == req.params.id);
//     if (comment) {
//       res.json(comment);
//     } else {
//       res.status(404).json({ message: 'Comment not found' });
//     }
//   });
  
//   app.post('/api/comment', (req, res) => {
//     const { destinationId, userId, text } = req.body;
//     const newId = comments.length + 1;
//     const newComment = { id: newId, destinationId, userId, text };
//     comments.push(newComment);
//     res.status(201).json(newComment);
//   });
  
//   app.patch('/api/comment/:id', (req, res) => {
//     const { text } = req.body;
//     const comment = comments.find(c => c.id == req.params.id);
//     if (comment) {
//       if (text) comment.text = text;
//       res.json(comment);
//     } else {
//       res.status(404).json({ message: 'Comment not found' });
//     }
//   });
  
//   app.delete('/api/comment/:id', (req, res) => {
//     const index = comments.findIndex(c => c.id == req.params.id);
//     if (index !== -1) {
//       comments.splice(index, 1);
//       res.status(204).end();
//     } else {
//       res.status(404).json({ message: 'Comment not found' });
//     }
//   });

// // Routes for image upload
// app.post('/upload', upload.single('image'), (req, res) => {
//   res.send('File uploaded successfully');
// });

// // Define other routes (example)
// app.get('/', (req, res) => {
//     res.send('Welcome to the server');
//   });
  
// // Error handling middleware
// app.use(errorHandler);

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//   });

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');
// console.log('Trying to require error-handler from:', __dirname + '/error-handler');
const errorHandler = require('.');


const app = express();
const port = 3000;

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Middleware function
const myMiddleware = (req, res, next) => {
    console.log('Middleware function executed');
    next();
};

// Use middleware
app.use(myMiddleware);

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like images)
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use custom logger middleware globally
app.use(logger);
app.use(express.json());

// Use authenticate middleware for specific routes
app.use('/api/private', authenticate);

// Sample data for destinations, users, and comments
const destinations = [
    { id: 1, name: 'Paris', description: 'The city of lights.', image: '/images/paris.jpg' },
    { id: 2, name: 'New York', description: 'The city that never sleeps.', image: '/images/newyork.jpg' },
    { id: 3, name: 'Tokyo', description: 'The bustling capital of Japan.', image: '/images/tokyo.jpg'}
];

const users = [
    { id: 1, username: 'john_doe', email: 'john@example.com' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com' }
];

const comments = [
    { id: 1, destinationId: 1, userId: 1, text: 'Amazing city!' },
    { id: 2, destinationId: 2, userId: 2, text: 'I love the skyscrapers!' }
];

// Routes for destinations
app.get('/', (req, res) => {
    const { name } = req.query;
    let filteredDestinations = destinations;
    if (name) {
        filteredDestinations = destinations.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
    }
    res.render('index', { destinations: filteredDestinations });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/destination/:id', (req, res) => {
    const destination = destinations.find(d => d.id == req.params.id);
    const destinationComments = comments.filter(c => c.destinationId == req.params.id);
    res.render('destination', { destination, comments: destinationComments });
});

// API endpoints for destinations
app.get('/api/destinations', (req, res) => {
    const { name } = req.query;
    let filteredDestinations = destinations;
    if (name) {
        filteredDestinations = destinations.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
    }
    res.json(filteredDestinations);
});

app.get('/api/destination/:id', (req, res) => {
    const destination = destinations.find(d => d.id == req.params.id);
    if (destination) {
        res.json(destination);
    } else {
        res.status(404).json({ message: 'Destination not found' });
    }
});

app.post('/api/destination', (req, res) => {
    const { name, description, image } = req.body;
    const newId = destinations.length + 1;
    const newDestination = { id: newId, name, description, image };
    destinations.push(newDestination);
    res.status(201).json(newDestination);
});

app.patch('/api/destination/:id', (req, res) => {
    const { name, description, image } = req.body;
    const destination = destinations.find(d => d.id == req.params.id);
    if (destination) {
        if (name) destination.name = name;
        if (description) destination.description = description;
        if (image) destination.image = image;
        res.json(destination);
    } else {
        res.status(404).json({ message: 'Destination not found' });
    }
});

app.delete('/api/destination/:id', (req, res) => {
    const index = destinations.findIndex(d => d.id == req.params.id);
    if (index !== -1) {
        destinations.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Destination not found' });
    }
});

// Routes for users
app.get('/users', (req, res) => {
    res.render('users', { users });
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/user/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.post('/api/user', (req, res) => {
    const { username, email } = req.body;
    const newId = users.length + 1;
    const newUser = { id: newId, username, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.patch('/api/user/:id', (req, res) => {
    const { username, email } = req.body;
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        if (username) user.username = username;
        if (email) user.email = email;
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.delete('/api/user/:id', (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id);
    if (index !== -1) {
        users.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Routes for comments
app.get('/comments', (req, res) => {
    res.render('comments', { comments });
});

app.get('/api/comments', (req, res) => {
    res.json(comments);
});

app.get('/api/comment/:id', (req, res) => {
    const comment = comments.find(c => c.id == req.params.id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

app.post('/api/comment', (req, res) => {
    const { destinationId, userId, text } = req.body;
    const newId = comments.length + 1;
    const newComment = { id: newId, destinationId, userId, text };
    comments.push(newComment);
    res.status(201).json(newComment);
});

app.patch('/api/comment/:id', (req, res) => {
    const { text } = req.body;
    const comment = comments.find(c => c.id == req.params.id);
    if (comment) {
        if (text) comment.text = text;
        res.json(comment);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

app.delete('/api/comment/:id', (req, res) => {
    const index = comments.findIndex(c => c.id == req.params.id);
    if (index !== -1) {
        comments.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

// Routes for image upload
app.post('/upload', upload.single('image'), (req, res) => {
    res.send('File uploaded successfully');
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});