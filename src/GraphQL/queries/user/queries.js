import { gql } from "@apollo/client";
import { hostel_const } from "../../contants";

export const LOAD_HOSTELS = gql`
  query LOAD_HOSTELS {
    hostels {
      ${hostel_const}
    }
  }
`;
