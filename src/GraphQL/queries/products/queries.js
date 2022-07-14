import { gql } from "@apollo/client";
import { product_const } from "../../contants";

export const LOAD_ITEMS = gql`
  query LOAD_ITEMS($count: Int) {
    items(count: $count) {
      ${product_const()}
    }
  }
`;

export const LOAD_HERO_DATA = gql`
  query LOAD_HERO_DATA($count: Int) {
    heroData(count: $count) {
      ${product_const()}
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
export const SEARCH_ITEMS = gql`
  query SEARCH_ITEMS($query: String!) {
    searchItems(query: $query) {
      isAvaliableForStore
      ${product_const()}
    }
  }
`;

export const LOAD_ITEM = gql`
  query LOAD_ITEM($slug: String!) {
    item(itemSlug: $slug) {
      ${product_const()}
    }
  }
`;