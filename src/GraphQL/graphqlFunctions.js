import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_NEW_PRODUCT } from "../../GraphQL/mutations/product";

// Saving new Items
export const saveItem = (data) => {
  const [addProduct, { loading, error, data }] = useMutation(ADD_NEW_PRODUCT);

}