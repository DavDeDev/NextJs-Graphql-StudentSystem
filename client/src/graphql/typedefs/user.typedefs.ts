import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    hello: String
    users(user: UserInput): [User]
    user(user: UserInput): User
   
  }

  type Mutation {
    register(user: UserInput): User
    login(email: String, password: String): User
  }

  type User {
    # Define your user fields here
    # For example:
    id: ID
    name: String
    email: String
  }

  input UserInput {
    id: String
    name: String
    email: String
    password: String
    role: String
  }
`;
export default typeDefs;