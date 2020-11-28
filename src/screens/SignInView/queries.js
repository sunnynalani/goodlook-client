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
export const REGISTER_CLIENT = gql`
  mutation registerClient($input: UsernamePasswordInput!) {
    registerClient(input: $UsernamePasswordInput) {
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

export const REGISTER_PROVIDER = gql`
  mutation registerProvider(
    $providerInput: ProviderInput
    $attributesInput: AttributesInput
    $input: UsernamePasswordInput!
  ) {
    registerProvider(
      providerInput: $providerInput
      attributesInput: $attributesInput
      input: $input
    ) {
      errors {
        field
        message
      }
      provider {
        id
      }
    }
  }
`
