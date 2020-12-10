import gql from 'graphql-tag'

export const CREATE_REVIEW = gql`
  mutation createReview(
    $input: ReviewInput!
    $providerId: Float!
    $clientId: Float!
  ) {
    createReview(input: $input, providerId: $providerId, clientId: $clientId) {
      success
      errors {
        field
        message
      }
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
        rating
        text
        client {
          id
          first_name
          last_name
        }
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

export const GET_CLIENT_FAVORITES = gql`
  query getFavorites($clientId: Float!) {
    favorites(clientId: $clientId) {
      id
    }
  }
`

export const ADD_FAVORITES = gql`
  mutation addFavorites($clientId: Float!, $providerId: Float!) {
    addFavorite(clientId: $clientId, providerId: $providerId) {
      success
    }
  }
`

export const UNFAVORITE = gql`
  mutation deleteFavorites($clientId: Float!, $providerId: Float!) {
    deleteFavorite(clientId: $clientId, providerId: $providerId) {
      success
    }
  }
`

export const LOGOUT_CLIENT = gql`
  mutation logout_client {
    logoutClient
  }
`

export const LOGOUT_PROVICER = gql`
  mutation logout_provider {
    logoutProvider
  }
`
