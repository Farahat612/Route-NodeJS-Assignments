import User from './User.js'
import Post from './Post.js'

User.hasMany(Post, { foreignKey: 'authorId' })
Post.belongsTo(User, { foreignKey: 'authorId' })
