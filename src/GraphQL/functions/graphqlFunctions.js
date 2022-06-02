import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { apolloClientAuth, apolloClientMain } from "../../apollo";
import { ADD_NEW_PRODUCT } from "../mutations/products";
import { LOAD_HERO_DATA, LOAD_ITEM_ATTRIBUTE } from "../queries/products";

export const LoadItemAttribute = ({ type }) => {
  const { loading, error, data } = useQuery(LOAD_ITEM_ATTRIBUTE, {
    variables: {
      type: type,
    },
  });
  const [itemAttribute, setItemAttribute] = useState(null);
  type = useRef(type);
  useEffect(() => {
    if (!loading) {
      if (data) {
        setItemAttribute(data.itemAttributes);
      }
      if (error) {
        console.log(error);
      }
    }
  }, [data, type, error, loading]);
  return (
    <>
      {loading && <option disabled={true}>Loading...</option>}
      {itemAttribute &&
        itemAttribute.map((type) => (
          <option
            key={type.id}
            className="text-base border-0 outline-none capitalize bg-white text-headingColor"
            value={type.urlParamName}
          >
            {type.name}
          </option>
        ))}
    </>
  );
};
export const saveItem = async (field) => {
  let res = null;
  try {
    const { loading, data } = await apolloClientMain.mutate({
      mutation: ADD_NEW_PRODUCT,
      variables: {
        product_slug: field.product_slug,
        product_name: field.product_name,
        product_price: field.product_price,
        product_image: field.product_image,
        product_category: field.product_category,
        product_type: field.product_type,
        product_description: field.product_description,
        product_calories: field.product_calories,
      },
    });
    if (data.product !== null) {
      res = {
        product: data.product,
        success: true,
        loading: loading,
      };
    }
    return res;
  } catch (error) {
    console.log(error);
    res = {
      product: null,
      success: false,
      loading: false,
    };
    return res;
  }
};

export const LoadHeroData = async () => {
  let res = null;
  try {
    const { loading, data } = await apolloClientAuth.query({
      query: LOAD_HERO_DATA,
      variables: {
        count: 6,
      },
    });
    if (data && data.heroData !== null) {
      res = {
        heroData: data.heroData,
        success: true,
        loading: loading,
      };
    }
    return res;
  } catch (error) {
    console.log(error);
    res = {
      heroData: null,
      success: false,
      loading: false,
    };
    return res;
  }
};
