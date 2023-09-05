const express = require ('express'); 
const apiRoutes = require('./api');
const app = express(); 

app.use('/', apiRoutes); 




module.exports = app; 