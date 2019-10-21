// Imports: GraphQL
import { gql } from "apollo-server-express";
// GraphQL: TypeDefs

const typeDefs = gql`
  type Company {
    _id: String!
    name: String
    email: String
    password: String
    hash: String
    description: String
    data: String
  }

  type User {
    _id: String!
    name: String
    email: String
    cedula: String
    registradoPor: String
    hash: String
    description: String
    data: String
  }

  type Certificate {
    _id: String!
    type: String
    userId: String
    description: String
    medic: String
    companyName: String
    hash: String
    data: String
  }

  type Query {
    allCompanies: [Company!]!
    allUsers: [User!]!
    allCertificates: [Certificate!]!
    allUsersFromCompany(registradoPor: String): [User!]!
    allCertificatesFromCompany(companyName: String): [Certificate!]!
    getUserCompany(email: String, password: String): [Company!]!
    getCompanyById(_id: String): [Company!]!
    getUserById(_id: String): [User!]!
    getCertificateById(_id: String): [Certificate!]!
    getCertificateByHash(hash: String): [Certificate!]!
    getCertificateByUserId(userId: String): [Certificate!]!
  }

  type Mutation {
    createUser(
      name: String!
      email: String
      cedula: String
      registradoPor: String
    ): User!
    createCompany(name: String!, email: String, password: String): Company!
    createCertificate(type: String!, userId: String, description: String, medic: String!, companyName: String, hash: String): Certificate!
  }
`;
// Exports
export default typeDefs;
