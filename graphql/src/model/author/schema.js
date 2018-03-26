const types = /* GraphQL */ `
  type Query {
    author(id: ID): Author
  }

  type Mutation {
    authorCreate(input: AuthorInput): Author
    authorUpdate(id: ID, input: AuthorInput): Boolean
  }

  type Author {
    id: ID
    name: String
    poems: [Poem]
  }
`;

const inputs = /* GraphQL */ `
  input AuthorInput {
    name: String!
  }
`;

export default () => [types, inputs];
