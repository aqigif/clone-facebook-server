var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET posts listing. */
router.get('/', async function(req, res, next) {
  try{
    var posts = await models.posts.findAll({include: ['users'], order:[['createdAt','DESC']]})
    posts = posts.map(item => {
      delete item.users.dataValues.password
      return item.dataValues;
    });
    res.status(200).send(posts)
  } catch(error){
    res.status(400).send({'Message':'something wrong'})
  }
});

/* GET posts id. */
router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  try{
    var posts = await models.posts.findByPk(id,{include: ['users']})
    delete posts.users.dataValues.password;
    res.status(200).send(posts)
  } catch(error){
    res.status(400).send({'Message':'something wrong'})
  }
});

/* Post. */
router.post('/', async function (req, res, next) {
  try {
    const feed = req.body.feed;
    const usersId = req.user.id;
    const posts = await models.posts.create({feed,usersId});
  if (posts) {
    res.status(201).send('created');
  }
 } catch (err) {
   res.status(400)
 }
});

/* update. */
router.patch('/:id', async function (req, res, next) {
  try {
    const postId = req.params.id;
    const {feed,image,usersId} = req.body;
    const posts = await models.posts.update({feed,image,usersId},{where: {id: postId}});
    if (posts) {
      res.status(201).send('updated')
    }
  } catch (err) {
    res.status(400)
  }
});

/* delete. */
router.delete('/:id', async function (req, res, next) {
  try {
    const postId = req.params.id;
    const posts = await models.posts.destroy({ where: {id: postId}})
    if (posts) {
      res.status(201).send('deleted')
    }
  } catch (err) {
    res.status(400)
  }
});
module.exports = router;
