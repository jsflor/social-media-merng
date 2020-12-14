const usersResolvers = require('./users');
const postResolvers = require('./posts');
const commentsResolvers = require('./comments');
const likesResolvers = require('./likes');

module.exports = {
    Post: {
      likeCount: (parent) => parent.likes.length,
      commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...likesResolvers.Mutation,
    },
    Subscription: {
        ...postResolvers.Subscription
    }
}
