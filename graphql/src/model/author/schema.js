const types = /* GraphQL */ `
  extend type Query {
    author(id: ID): Author
  }

  type Mutation {
    authorCreate(input: AuthorInput): Author
  }

  type Author {
    id: ID
    name: String
  }
`;

const inputs = /* GraphQL */ `
  input AuthorInput {
    name: String
  }
`;

export default () => [types, inputs];
