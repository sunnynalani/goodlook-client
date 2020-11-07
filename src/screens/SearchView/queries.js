import gql from 'graphql-tag'

//haven't implemented filter and sort yet...
export const GET_PROVIDERS = gql`
  query getProviders {
    providers {
      errors {
        field
        message
      }
      providers {
        id
        name
      }
    }
  }
`
