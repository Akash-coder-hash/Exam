const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/courses');
const db = mongoose.connection
db.on('error',(error) => console.error(error));
db.once('open',()=> console.log('Connected to Database'));

app.use(express.json());

const coursesRouter = require('./routes/index');
app.use('/api/courses', coursesRouter);

app.listen(3000, ()=> console.log('Server Started'));