const types = /* GraphQL */ `
  type Query {
    poem(id: ID!): Poem
  }

 type Poem {
   title: String
   author: Author
 }
`;

export default () => [types];
