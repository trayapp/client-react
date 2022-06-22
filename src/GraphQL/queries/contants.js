export const product_const = `      
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
avaliableStore
productCreator {
  profile {
    user {
      username
    }
    vendor{
      store{
        storeName
        storeNickname
      }
    }
  }
}
`;
