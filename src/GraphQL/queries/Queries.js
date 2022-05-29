import { gql } from "@apollo/client";

export const LOAD_ITEMS = gql`
  query LOAD_ITEMS {
    items {
      productName
      productPrice
      productCalories
      productDesc
      productAvaliableIn {
        storeName
      }
      productImages {
        productImage
        isPrimary
      }
      productCreator {
        profile {
          user {
            username
          }
        }
      }
    }
  }
`;

export const LOAD_VENDORS = gql`
  query LOAD_VENDORS {
    vendors {
      store {
        storeName
        storeCategory
        storeNickname
      }
    }
  }
`;
