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
