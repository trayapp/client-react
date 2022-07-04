import { gql } from "@apollo/client";

export const LOAD_HOSTELS = gql`
  query LOAD_HOSTELS {
    hostels {
      name
      gender
      shortName
      isFloor
      floorCount
    }
  }
`;
