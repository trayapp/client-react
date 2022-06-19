import { gql } from "@apollo/client";

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
          storeName
          storeAbbv
          storeNickname
          storeCategory
          storeProducts {
            id
            isAvaliable
            productName
            productQty
            productType {
              name
              id
              urlParamName
            }
            productCategory {
              name
              id
              urlParamName
            }
            productSlug
            productPrice
            productImages {
              productImage
              isPrimary
            }
            productCalories
            productViews
            productClicks
            productAvaliableIn {
              storeName
              storeNickname
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
      }
    }
  }
`;
