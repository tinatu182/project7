const express = require('express');
const path = require('path') // used to pathing the app
// const userRouter = require('./routes/user');
// const sauceRouter = require('./routes/sauce');
const app = express();
// require('./models').init();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// app.use('/api/sauces', sauceRouter);
// app.use('/api/auth', userRouter);
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;

// TODO copy the route and controller for the user fr prj6
// TODO replace mogoose from proj6 with sequelize