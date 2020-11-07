import gql from 'graphql-tag'

export const LOGIN_CLIENT = gql`
  mutation loginClient($usernameOrEmail: String!, $password: String!) {
    loginClient(usernameOrEmail: $usernameOrEmail, password: $password) {
      errors {
        field
        message
      }
      client {
        id
        username
        email
        firstName
        lastName
      }
    }
  }
`
