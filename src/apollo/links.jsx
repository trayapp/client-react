import { onError } from "@apollo/client/link/error";
import { ApolloLink, fromPromise } from '@apollo/client';
import { createUploadLink } from "apollo-upload-client";
import { getAccessTokenPromise } from "../context/utils";
import { alertSliceActions } from "../context/actions";


export const errorHandler = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      console.error(`[ERROR] ${message}`);
    });
  if (networkError) {
    alertSliceActions.createAlert({
      type: "error",
      message: `${networkError} ❌`,
    });
    console.log(networkError);
  }
  // response.errors = undefined
};

export const linkError = onError(errorHandler);
const uri = "http://localhost:8000/graphql/";
export const linkAuth = createUploadLink({ uri });

export const linkMain = createUploadLink({ uri });

// VERSION 1
// import { setContext } from "@apollo/client/link/context";
// export const linkTokenHeader = setContext(async (_, { headers }) => {
//   const accessToken = await getAccessTokenPromise();
//   return {
//     headers: {
//       ...headers,
//       Authorization: accessToken ? `JWT ${accessToken}` : "",
//     },
//   };
// });

// VERSION 2
export const linkTokenHeader = new ApolloLink((operation, forward) =>
  fromPromise(getAccessTokenPromise())
    .flatMap(accessToken => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          Authorization: accessToken ? `JWT ${accessToken.token}` : '',
        }
      }
      ))
      return forward(operation)
    })
)
