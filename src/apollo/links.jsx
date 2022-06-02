import { onError } from "@apollo/client/link/error";
// import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink as createHttpLink } from "apollo-upload-client";
import { getAccessTokenPromise } from "../context/utils";

export const errorHandler = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => console.log(message));
  if (networkError) {
    console.log(networkError);
  }
  // response.errors = undefined
};

export const linkError = onError(errorHandler);
const uri = "http://localhost:8000/graphql/";
export const linkAuth = createHttpLink({ uri });

export const linkMain = createHttpLink({ uri });

// VERSION 1
export const linkTokenHeader = setContext(async (_, { headers }) => {
  const accessToken = await getAccessTokenPromise();
  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `JWT ${accessToken}` : "",
    },
  };
});

// VERSION 2
// import { ApolloLink, fromPromise } from '@apollo/client';
// export const linkTokenHeader = new ApolloLink((operation, forward) =>
//   fromPromise(getAccessTokenPromise())
//     .flatMap(accessToken => {
//       operation.setContext(({ headers = {} }) => ({
//         headers: {
//           ...headers,
//           Authorization: accessToken ? `JWT ${accessToken}` : '',
//         }
//       }
//       ))
//       return forward(operation)
//     })
// )
