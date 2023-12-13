const jwt = require("jsonwebtoken");
const { User } = require("../models");


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.KEY);
    const userId = decodedToken.userId;
    req.authID = userId;
    if (req.body.userId && parseInt(req.body.userId) !== userId) {
      throw 'Invalid user ID';
    } else {
      User.findOne({ where: { id: userId } }).then((user) => {
        req.auth = user;
        next();
      });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}