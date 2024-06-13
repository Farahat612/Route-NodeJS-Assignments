import { DataTypes } from 'sequelize'
import sequelize from '../config/config.js'
import User from './User.js'
import Post from './Post.js'

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
})

Comment.belongsTo(User, { as: 'user', foreignKey: 'userId' })
Comment.belongsTo(Post, { as: 'post', foreignKey: 'postId' })

export default Comment
