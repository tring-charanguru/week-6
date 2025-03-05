import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($userName: String!, $email: String!, $password: String!) {
    CreateUser(user_name: $userName, email: $email, password: $password) {
      user_id
    }
  }
`
export const ADD_PERSONA=gql`
mutation($userId: ID!, $name: String!, $image: String, $quotes: String, $description: String, $motivation: String, $painPoints: String, $needs: String, $activities: String){
  addPersona(user_id: $userId, name: $name, image: $image, quotes: $quotes, description: $description, motivation: $motivation, painPoints: $painPoints, needs: $needs, activities: $activities) {
  user_id
  name
  image
  quotes
  description
  motivation
  painPoints
  needs
  activities
  id
  }
}
`;

export const DELETE_PERSONA=gql`
mutation($deletePersonaId: ID!, $userId: ID!){
  deletePersona(id: $deletePersonaId, user_id: $userId)
}
`;

export const UPDATE_PERSONA = gql`
mutation($updatePersonaId: ID!, $userId: ID!,$name: String!,$image:String,$activities:String,$painPoints:String,$needs:String,$motivation:String,$description:String,$quotes:String){
  updatePersona(id: $updatePersonaId, user_id: $userId, name: $name,image:$image,activities: $activities,painPoints: $painPoints,needs: $needs,motivation: $motivation ,description: $description,quotes: $quotes)
}
`;


