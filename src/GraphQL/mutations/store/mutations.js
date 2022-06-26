import { gql } from "@apollo/client";
import { product_const } from "../../contants";

export const ADD_PRODUCT_TO_AVAILABLE_PRODUCTS = gql`
mutation ADD_PRODUCT_TO_AVAILABLE_PRODUCTS($product_slug: String!, $action: String!){
    addAvaliableProduct(product_slug: $product_slug, action: $action){
        success
        product {
            ${product_const}
        }
    }
}
`;
