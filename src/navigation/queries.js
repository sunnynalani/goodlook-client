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

export const GET_PROVIDER = gql`
  query getProvider($providerId: Float!) {
    provider(providerId: $providerId) {
      errors {
        field
        message
      }
      provider {
        id
        name
        average_rating
        licensed
        country
        city
        state
        categories
        bike_parking
        accepts_bitcoin
        accepts_credit_cards
        garage_parking
        street_parking
        dogs_allowed
        valet_parking
        wheelchair_accessible
        flexible_timing
      }
    }
  }
`

export const GET_CLIENT = gql`
  query getClient($clientId: Float!) {
    client(clientId: $clientId) {
      errors {
        field
        message
      }
      client {
        id
        email
        username
        first_name
        last_name
      }
    }
  }
`

export const GET_CLIENT_REVIEWS = gql`
  query getClientReviews($clientId: Float!) {
    clientReviews(clientId: $clientId) {
      errors {
        field
        message
      }
      reviews {
        provider {
          id
          name
        }
        rating
        text
      }
    }
  }
`

export const GET_CLIENT_FAVORITES = gql`
  query getClientFavorites($clientId: Float!) {
    favorites(clientId: $clientId) {
      id
      name
    }
  }
`
