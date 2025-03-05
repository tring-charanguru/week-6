const express = require('express')
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const typeDefs = require('./graphql/TypeDefs');
const { expressMiddleware } = require('@apollo/server/express4');
const resolvers = require('./graphql/resolvers');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
app.use(express.json({ limit: '10mb' }))
app.use(cors())
const startServer = async () => {
  await server.start(); 
  app.use('/graphql', expressMiddleware(server));

  app.listen(8081, () => {
    console.log("The server is running on port 8081");
  });
};

startServer();
