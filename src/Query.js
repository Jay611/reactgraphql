const githubQuery = (pageCount, queryString, paginationKeyword, paginationString) => {
  return {
    query: `
  {
    viewer {
      name
    }
    search(query: "${queryString} user:Jay611 sort:updated-desc", type: REPOSITORY, ${paginationKeyword}: ${pageCount}, ${paginationString}) {
      repositoryCount
      edges{
        cursor
        node {
          ... on Repository {
            name
            description
            id
            url
            viewerSubscription
            licenseInfo{
              spdxId
            }
          }
        }
      }
      pageInfo{
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
  `,
  };
};

export default githubQuery;
