const types = /* GraphQL */ `
  extend type Query {
    poem(id: ID): Poem
  }

  extend type Mutation {
    poemCreate(input: PoemInput): Poem
    poemUpdate(id: ID, input: PoemInput): Boolean
  }

  type Poem {
    id: ID
    title: String
    teaser: String
    author: Author
  }
`;

const inputs = /* GraphQL */ `
  input PoemInput {
    title: String!
    teaser: String!
    authorId: ID!
  }
`;

export default () => [types, inputs];
