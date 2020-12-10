import gql from 'graphql-tag'

export const CREATE_REVIEW = gql`
  mutation loginClientOnly(
    $input: ReviewInput!
    $providerId: Float!
    $clientId: Float!
  ) {
    createReview(input: $input, providerId: $providerId, clientId: $clientId) {
      success
      errors
    }
  }
`

export const GET_PROVIDER_REVIEWS = gql`
  query getProviderReviews($providerId: Float!) {
    providerReviews(providerId: $providerId) {
      errors {
        field
        message
      }
      reviews {
        id
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
