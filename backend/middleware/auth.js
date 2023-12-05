const jwt = require("jsonwebtoken");
const { User } = require("../models");


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.KEY);
    const userId = decodedToken.userId;
    console.log(decodedToken)
    User.findOne({ where: { id: userId } }).then((user) => {
      req.auth = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}