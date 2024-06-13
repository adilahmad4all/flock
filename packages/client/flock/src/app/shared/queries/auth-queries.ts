import { gql } from 'apollo-angular';

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    loginUser(user: { username: $username, password: $password }) {
      email
      token
      username
      image
      bio
    }
  }
`;

export const REGISTER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!, $image: String!) {
    createUser(
      user: {
        username: $username,
        email: $email,
        password: $password,
        image: $image
      }
    ) {
      username
      email
      token
      bio
      image
    }
  }
`;
