import {gql} from "@apollo/client";

export const GET_USER=gql`
  query($email:String!,$password:String!){
    getUser(email:$email,password:$password)
    {
    user_name,
    user_id,
    email,
    personas {
      name
      image
      id
      activities
      painPoints
      needs
      motivation
      quotes
      description
      }
    }
}
`;

