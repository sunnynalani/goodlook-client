import gql from 'graphql-tag'

export const CREATE_REVIEW = gql`
  mutation loginClientOnly($usernameOrEmail: String!, $password: String!) {
    loginClient(usernameOrEmail: $usernameOrEmail, password: $password) {
      errors {
        field
        message
      }
      client {
        id
        username
        email
        first_name
        last_name
      }
    }
  }
`

export const ME_CLIENT = gql`
  query self {
    meClient {
      id
      username
      first_name
      last_name
      reviews {
        id
        rating
        text
      }
    }
  }
`

export const LOGOUT_CLIENT = gql`
  mutation logout_client {
    logoutClient
  }
`
