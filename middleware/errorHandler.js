module.exports = (err, req, res, next) => {
    console.error(err.stack);  // Log the error stack
    res.status(500).json({ message: 'Something went wrong!' });  // Send a generic error response
};