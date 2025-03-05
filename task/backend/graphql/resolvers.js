const query =require("./Query")
const mutation = require("./Mutation")
const resolvers = {
  Query: query,  
  Mutation:mutation
};
module.exports = resolvers;
