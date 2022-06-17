import { gql } from "@apollo/client";

export const LOAD_ITEMS = gql`
  query LOAD_ITEMS($count: Int) {
    items(count: $count) {
      productName
      productType {
        name
        urlParamName
      }
      productCategory {
        name
        urlParamName
      }
      productCalories
      id
      productSlug
      productPrice
      productQty
      productImages {
        productImage
        isPrimary
      }
    }
  }
`;

export const LOAD_HERO_DATA = gql`
  query LOAD_HERO_DATA($count: Int) {
    heroData(count: $count) {
      id
      productName
      productPrice
      productQty
      productCategory {
        name
        urlParamName
        Type
      }
      productImages {
        productImage
        isPrimary
      }
    }
  }
`;

export const LOAD_ITEM_ATTRIBUTE = gql`
  query itemAttributes($type: Int!) {
    itemAttributes(Type: $type) {
      id
      name
      urlParamName
    }
  }
`;
