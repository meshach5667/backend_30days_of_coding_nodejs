const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ecae8c5db0e1fb2f1d4d9ea4e478e9462c3d9a3bf2b1eab8e5f857d91e9ab8e4';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.userId = decoded.uid;
    next();
  });
};

module.exports = verifyToken;
