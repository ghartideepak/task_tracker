const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // Should be same as used in auth.js

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'No token, access denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
