import { gql } from "@apollo/client";

export const ADD_NEW_PRODUCT = gql`
  mutation addProduct(
    $product_slug: String!
    $product_name: String!
    $product_price: Int!
    $product_image: Upload!
    $product_category: String!
    $product_type: String!
    $product_description: String
    $product_calories: Int
  ) {
    addProduct(
      productSlug: $product_slug
      productName: $product_name
      productPrice: $product_price
      productImage: $product_image
      productCategory: $product_category
      productType: $product_type
      productDesc: $product_description
      productCalories: $product_calories
    ) {
      product {
        productName
        productPrice
        productSlug
        productDesc
        productCalories
        productImages {
          productImage
          isPrimary
        }
        productType {
          name
          urlParamName
        }
        productCategory {
          name
          urlParamName
        }
      }
    }
  }
`;
