import gql from 'graphql-tag'

export const LOGIN = gql`
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
        first_name
        last_name
      }
    }
    loginProvider(usernameOrEmail: $usernameOrEmail, password: $password) {
      errors {
        field
        message
      }
      provider {
        id
        username
        email
        name
      }
    }
  }
`

export const LOGIN_CLIENT_ONLY = gql`
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

export const REGISTER_CLIENT = gql`
  mutation registerClient(
    $input: UsernamePasswordInput!
    $attributeInput: ClientInput!
  ) {
    registerClient(input: $input, attributeInput: $attributeInput) {
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

export const LOGOUT_CLIENT = gql`
  mutation logout_client {
    logoutClient
  }
`
