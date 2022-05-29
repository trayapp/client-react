import { gql } from "@apollo/client";

export const ADD_NEW_PRODUCT = gql`
  mutation addProduct {
    addProduct(
      productName: $product_name
      productPrice: $product_price
      productType: $product_type
      productCategory: $product_category
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
