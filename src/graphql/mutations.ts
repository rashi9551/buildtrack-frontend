// graphql/mutations.ts
import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: CreateUserInput!) {
    signup(input: $input) {
      id
      email
      name
      role
    }
  }
`;


export const LOGIN_MUTATION = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      token
    }
  }
`;

