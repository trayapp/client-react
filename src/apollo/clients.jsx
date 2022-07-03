import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { linkError, linkAuth, linkMain, linkTokenHeader } from "./links";
import { CachePersistor } from "apollo3-cache-persist";

const inMemoryCache = new InMemoryCache({
  // freezeResults: true,
});

const SCHEMA_VERSION = "1";
const SCHEMA_VERSION_KEY = `tray-version-1`;

export const apolloClientAuth = new ApolloClient({
  //DEV connectToDevTools to false in production
  connectToDevTools: false,
  link: linkAuth,
  cache: inMemoryCache,
  csrfPrevention: true,
  cors: {
    origin: ["http://localhost:8000"],
    credentials: true,
  },
});

const options = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "none",
  },
  query: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "none",
  },
  mutate: {
    errorPolicy: "none",
  },
};

export const apolloClientMain = new ApolloClient({
  //DEV connectToDevTools to false in production
  connectToDevTools: false,
  defaultOptions: options,
  link: ApolloLink.from([linkError, linkTokenHeader, linkMain]),
  cache: inMemoryCache,
  csrfPrevention: true,
  cors: {
    origin: ["http://localhost:8000"],
    credentials: true,
  },
});

export const getApolloClient = async () => {
  const httpLink = ApolloLink.from([linkError, linkTokenHeader, linkMain]);
  const cache = inMemoryCache;

  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage,
  });

  const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY);

  if (currentVersion === SCHEMA_VERSION) {
    await persistor.restore();
  } else {
    await persistor.purge();
    window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
  }

  return new ApolloClient({
    link: httpLink,
    cache,
    assumeImmutableResults: true,
  });
};
