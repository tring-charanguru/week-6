const express = require('express')
const app=express()
const PORT=8081;
const userData=require('./user.json')
const graphql =require('graphql')
const {graphqlHTTP} =require('express-graphql')

const UserType=new graphql.GraphQLObjectType({
    name:"User",
    fields:()=>({
        id:{type:graphql.GraphQLInt},
        name:{type:graphql.GraphQLString},
        age:{type:graphql.GraphQLInt},
        role:{type:graphql.GraphQLString}

    })
})
const resType =new graphql.GraphQLObjectType({
    name:"response",
    fields:()=>({
        message:{type:graphql.GraphQLString}
    })
})
const RootQuery=new graphql.GraphQLObjectType({
    name:"Query",
    fields:{
        getAllUsers:{
            type:new graphql.GraphQLList(UserType),
            resolve(parent){
                return userData;
            }
        },
        getUserById: {
            type: UserType,
            args: {
              id: { type: graphql.GraphQLInt }
            },
            resolve(parent, args) {
              const user = [...userData].find((data) => data.id === args.id);
              if(!user)
              {
                return new Error('User not found on that id');
              }
              return user;
            }
          }
    }
})
const Mutation=new graphql.GraphQLObjectType({
    name:"Mutation",
    fields:{
        insertData:{
            type:resType,
            args:{
                id:{type:graphql.GraphQLInt},
                name:{type:graphql.GraphQLString},
                age:{type:graphql.GraphQLInt},
                role:{type:graphql.GraphQLString}
            },
            resolve(parent,args){
                userData.push({id:args.id,name:args.name,age:args.age,role:args.role})
                return {message:"Data inserted successfully"};
            }
        },
        deleteData:{
            type:resType,
            args:{
                id:{type:graphql.GraphQLInt}
            },
            resolve(parent,args){
                const user = userData.findIndex((data)=>data.id==args.id);
                if(user==-1)
                {
                    return new Error("Id not Found.....");
                }
                else{
                    userData.splice(user,1);
                    return {message:"The data Deleted successfully"}
                }
            }
        },
        updateData:{
            type:resType,
            args:{
                id:{type:graphql.GraphQLInt},
                name:{type:graphql.GraphQLString},
                role:{type:graphql.GraphQLString},
                age:{type:graphql.GraphQLInt}
            },
            resolve(parent,args){
                
            }
        }


    }
});
const schema=new graphql.GraphQLSchema({
    query: RootQuery,mutation:Mutation
})
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true,
}))
console.log(userData);
app.listen(PORT,()=>{
    console.log(`The server running on the port ${PORT}`)
})

