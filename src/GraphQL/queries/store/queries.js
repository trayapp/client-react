import { gql } from "@apollo/client";
import { store_const } from "../../contants";

export const GET_STORE_QUERY = gql`
  query GET_STORE($storeNickname: String!) {
    getStore(storeNickname: $storeNickname) {
      vendor {
        profile {
          image
          phoneNumber
          isStudent
        }
        store {
          ${store_const}
        }
      }
    }
  }
`;
