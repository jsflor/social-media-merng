const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

/* CONFIG */
const {MONGODB} = require('./config');
/* MODELS */
const Post = require('./models/Post');
const User = require('./models/User');

const typeDefs = gql`
    type Post {
        id: ID!,
        body: String!,
        createdAt: String!,
        username: String!
    }
    type Query {
        getPosts: [Post]
    }
`;

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch (e) {
                throw new Error(e);
            }
        }
    }
};

const server = new ApolloServer({
   typeDefs,
   resolvers
});

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB connected!');
        return server.listen({port: 8080});
    })
    .then(res => console.log(`Server running at ${res.url}`));
