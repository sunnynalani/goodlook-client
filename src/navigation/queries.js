import gql from 'graphql-tag'

export const ME = gql`
  query self {
    meClient {
      id
    }
    meProvider {
      id
    }
  }
`
