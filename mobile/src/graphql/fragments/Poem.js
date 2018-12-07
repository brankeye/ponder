export default `
  fragment Poem on Poem {
    id
    title
    teaser
    lines
    inLibrary
    inLibraryAt
    viewedAt
    author {
      id
      name
      inLibrary
      inLibraryAt
      viewedAt
      poems {
        id
        title
        teaser
        lines
        inLibrary
        inLibraryAt
        viewedAt
      }
    }
  }
`;
