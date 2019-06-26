'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    feed: DataTypes.TEXT,
    image: DataTypes.TEXT,
    usersId: DataTypes.INTEGER
  }, {});
  posts.associate = function(models) {
    posts.belongsTo(models.users, {foreignKey: 'usersId', as: 'users'})
  };
  return posts;
};