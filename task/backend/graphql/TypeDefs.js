const {gql} =require('graphql-tag')

const typeDefs = gql`
type  User {
    user_id: ID!      
    user_name: String
    email: String
    password: String
    personas: [Persona]
  }
  type Persona {
    id: ID!            
    name: String
    image: String  
    quotes: String  
    description: String 
    motivation: String 
    painPoints: String   
    needs: String
    activities: String 
    user_id: ID!     
  }

  type Query {       
    getUser(email: String!,password:String!): User
    personas: [Persona]!    
  }

  type Mutation {
    CreateUser(user_name: String!, email: String!, password: String!): User
    addPersona(user_id:ID!,name:String!,image:String,quotes:String,description:String,motivation:String,painPoints:String,needs:String,activities:String):Persona
    deletePersona(id: ID!,user_id:ID!): String 
    updatePersona(id:ID!,user_id:ID!,name:String!,image:String,quotes:String,description:String,motivation:String,painPoints:String,needs:String,activities:String):String
  }
`;

module.exports=typeDefs;