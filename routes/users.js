var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try{
    var users = await models.users.findAll()
    users = users.map(item => {
      delete item.dataValues.password
      return item.dataValues;
    });
    res.status(200).send(users)
  } catch(error){
    res.status(400).send({'Message':'something wrong'})
  }
});

/* GET users id. */
router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  try{
    var users = await models.users.findByPk(id)
    delete users.dataValues.password;
    res.status(200).send(users)
  } catch(error){
    res.status(400).send({'Message':'something wrong'})
  }
});

/* Post. */
router.post('/', async function (req, res, next) {
  try {
    const {name,email,password,avatar} = req.body;
    const users = await models.users.create({name,email,password,avatar});
  if (users) {
    res.status(201).send('created');
  }
 } catch (err) {
   res.status(400)
 }
});

/* update. */
router.patch('/:id', async function (req, res, next) {
  try {
    const userId = req.params.id;
    const {name,email,password,avatar} = req.body;
    const users = await models.users.update({name,email,password,avatar},{where: {id: userId}});
    if (users) {
      res.status(201).send('updated')
    }
  } catch (err) {
    res.status(400)
  }
});

/* delete. */
router.delete('/:id', async function (req, res, next) {
  try {
    const userId = req.params.id;
    const users = await models.users.destroy({ where: {id: userId}})
    if (users) {
      res.status(201).send('deleted')
    }
  } catch (err) {
    res.status(400)
  }
});
module.exports = router;
