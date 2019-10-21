// Imports: GraphQL
import { ApolloServer } from 'apollo-server-express';

// Imports: GraphQL TypeDefs & Resolvers
import typeDefs from './services/Types';
import resolvers from './services/Resolvers.js';
import User from './models/User';
import Company from './models/Company';
import Certificate from './models/Certificate';

// GraphQL: Schema
const Server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
      User, Company, Certificate
  },
  playground: {
    endpoint: `http://localhost:3000/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
}); 

// Exports
export default Server;
