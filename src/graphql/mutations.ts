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

export const GOOGLE_LOGIN_MUTATION = gql`
  mutation GoogleLogin($email: String!) {
    googleLogin(email: $email) {
      token
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      _id
      name
      description
      location
      startDate
      endDate
      budget
      priority
    }
  }
`;

export const GET_PROJECTS = gql`
  query {
    projects {
      _id
      name
      description
      location
      startDate
      endDate
      budget
      priority
    }
  }
`;
