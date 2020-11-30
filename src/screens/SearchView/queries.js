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
        city
        state
        categories
      }
    }
  }
`
