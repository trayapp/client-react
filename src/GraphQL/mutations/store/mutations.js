import { gql } from "@apollo/client";
import { product_const } from "../../contants";

export const ADD_PRODUCT_TO_AVAILABLE_PRODUCTS = gql`
mutation ADD_PRODUCT_TO_AVAILABLE_PRODUCTS($product_slug: String!, $action: String!){
    addAvaliableProduct(productSlug: $product_slug, action: $action){
        success
        product {
            isAvaliableForStore
            ${product_const()}
        }
    }
}
`;
