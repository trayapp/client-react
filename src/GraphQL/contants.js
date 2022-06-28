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

export const store_const = `
  storeName
  storeRank
  storeNickname
  storeCategory
  storeProducts {
    isAvaliableForStore
    ${product_const}
  }
`;
