import gql from 'graphql-tag'

export const TEST_QUERY = gql`
  query tests {
    test
  }
`

export const ME = gql`
  query self {
    selfClient {
      id
    }
    selfProvider {
      id
    }
  }
`