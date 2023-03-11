const express = require('express');
const route = express.Router();
const {signup,getalluser,loginwithgoogle}= require('../controller/userController');


route.post('/signup',signup) 

route.get("/loginwithgoogle", loginwithgoogle);

route.get('/getalluser',getalluser)