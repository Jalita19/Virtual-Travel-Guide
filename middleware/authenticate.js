const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token && token === 'Bearer valid-token') {
      next(); // Token is valid, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
  };