import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success
      errors
      unarchiving
      token
      refreshToken
      unarchiving
      user {
        id
        username
        firstName
        lastName
        email
        verified
        isActive
        profile {
          image
          phoneNumber
          vendor {
            store {
              storeName
            }
          }
          client {
            hostel
            room
          }
        }
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser(
    $first_name: String!
    $last_name: String!
    $username: String!
    $email: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      firstName: $first_name
      lastName: $last_name
      username: $username
      email: $email
      password1: $password1
      password2: $password2
    ) {
      success
      errors
      token
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation verifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
      success
      errors
    }
  }
`;
export const REFRESH_TOKEN = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      payload
      success
      errors
      refreshToken
    }
  }
`;

export const LOGOUT = gql`
  mutation LOGOUT($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      revoked
      success
      errors
    }
  }
`;
