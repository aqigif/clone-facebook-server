var express = require("express");
var router = express.Router();
var models = require("../models");
var sha256 = require("sha256");
const bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");

//login route
router.post("/login", function(req, res) {
  var email = req.body.email;
  var validpassword = req.body.password;
  validpassword = sha256(validpassword);
  models.users
    .findOne({ where: { email: email } })
    .then(function(user) {
      if (user != null) {
        payload = user.dataValues;
        password = payload.password;

        delete payload.password;
        delete payload.createdAt;
        delete payload.updatedAt;
        if (validpassword == password) {
          var token = jwt.sign(payload, process.env.SECRET_KEY);
          res.send({ data: user, token: token, status: "Success" });
        }
      } else {
        res.send({ status: "Failure" });
      }
    })
    .catch(function(e) {
      res.status(400).send("error");
    });
});

module.exports = router;
