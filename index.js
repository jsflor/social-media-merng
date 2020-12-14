const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

/* CONFIG */
const {MONGO_DB} = require('./config');
/* GRAPHQL */
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: ({req}) => ({req})
});

mongoose.connect(MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB connected!');
        return server.listen({port: 8080});
    })
    .then(res => console.log(`Server running at ${res.url}`));
