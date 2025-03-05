const db=require("../db/database")
const bcrypt=require("bcryptjs")

const mutation={
    CreateUser: async (_, { user_name, email, password }) => {
        try {
          const already = await db.query("SELECT * FROM users WHERE email=$1", [email]);
          if (already.rows.length > 0) {
            throw new Error("Email already exists");
          }
          const hashedPassword = await bcrypt.hash(password, 10); 
          const insertUser = await db.query(
            "INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [user_name, email, hashedPassword]
          );
    
          return insertUser.rows[0];
        } catch (error) {
          throw new Error(error.message||"Failed to create user");
        }
      }
    ,
    addPersona:async(_,args)=>{
        try{
        const insertPersona= await db.query("INSERT INTO personas (user_id,name,image,quotes,description,motivation,painPoints,needs,activities) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING user_id,name,image,quotes,description,motivation,painPoints,needs,activities",
            [args.user_id,args.name,args.image,args.quotes,args.description,args.motivation,args.painPoints,args.needs,args.activities]);
            return insertPersona.rows[0];
        }
        catch(e){
            return new Error("Error while inserting");
        }
    },
    deletePersona:async(_,args)=>{
        const time =new Date()
        const deletePersona=await db.query("UPDATE personas set time=$1 where id=$2 AND user_id=$3 RETURNING *",[time,args.id,args.user_id])
        if(!deletePersona.rows[0]){
            return new Error("No personas in that id");
        }
        return "Data deleted succesfully";
    },
    updatePersona:async(_,args)=>{
        try{
        const updatePersona=await db.query(` UPDATE personas
        SET
          name = $1,
          image = $2,
          quotes = $3,
          description = $4,
          motivation = $5,
          painPoints = $6,
          needs = $7,
          activities = $8
        WHERE
          id = $9
          AND user_id = $10
        RETURNING *;`,[args.name,args.image,args.quotes,args.description,args.motivation,args.painPoints,args.needs,args.activities,args.id,args.user_id])
        if(updatePersona.rows[0]){
            return "Successfully updated";
        }
        else
            return new Error("id not exists");
        }
        catch(e){
            return new Error("Error while updating",e);
        }
    
    }
  }
  module.exports = mutation;