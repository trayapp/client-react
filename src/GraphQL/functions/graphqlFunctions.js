import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { LOAD_ITEM_ATTRIBUTE } from "../queries/products";

export const LoadItemAttribute = ({ type }) => {
  const { loading, error, data } = useQuery(LOAD_ITEM_ATTRIBUTE, {
    variables: {
      type: type,
    },
    fetchPolicy: "network-only"
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

