import gql from 'graphql-tag'

//haven't implemented filter and sort yet...
export const GET_PROVIDERS = gql`
  query getProviders(
    $within: distanceInput
    $sort: GraphQLSortType
    $filters: GraphQLFilterType
  ) {
    providers(within: $within, sort: $sort, filters: $filters) {
      errors {
        field
        message
      }
      providers {
        id
        name
        longitude
        latitude
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
        reviews {
          id
          rating
          text
        }
      }
    }
  }
`
