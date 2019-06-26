var express = require('express');
var router = express.Router();
var models = require('../models');
var md5 = require('md5');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

//login route
router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    models.users.findOne({where :{email:email} })
    .then(function(user){
        if (user!=null){
            var token = jwt.sign({user}, process.env.SECRET_KEY);
            res.send(token);
        }else{
            res.send('kosong');
        }
    })
    .catch(function(e){
        res.send('error');
    })
})
  

module.exports = router;
