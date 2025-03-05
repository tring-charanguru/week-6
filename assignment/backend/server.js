const express=require('express'); 
const cors=require('cors');
const app=express();
const db=require('./database');
app.use(express.json());
app.use(cors());
const PORT=8080;
app.get('/getUsers',async(req,res)=>{
    try{
    const data=await db.query("SELECT * from detail");
    return res.status(200).json(data.rows);
    }
    catch(e){
    if (e.code === '42P01') { 
        return res.status(400).json({ message: "Table does not exist." });
      }
      
      return res.status(500).json({ message: "Internal server error"});
    }

})
app.post('/insertUsers',async(req,res)=>{
    const {name,age,college}=req.body;
    try{
            await db.query("INSERT into detail (name,age,college) values($1,$2,$3) returning *",[name,age,college]);
            return res.status(200).json({message:"data inserted successfully.."});
    }
    catch(e){
            return res.status(500).json({message:"Cannot inserted"});
    }

})

app.put('/updateExistingData',async (req,res)=>{
    const {id,name,age,college}=req.body;
    try{
        const updateData=await db.query("UPDATE detail set name=$1,age=$2,college=$3 WHERE id=$4 returning *",[name,age,college,id]);
        if(updateData.rows.length === 0)
        {
            return res.status(404).json({message:"id not found"})
        }
        return res.status(200).json({message:"Updated successfully"})
    }
    catch(e){
        return res.status(500).json({message:"Error While updating the data",err:e.message})
    }
})
app.delete('/deleteExistingUser',async(req,res)=>{
    const {id}=req.body;
    try{
        const deleteUser=await db.query("DELETE from detail where id=$1 returning *",[Number(id)]);
        if(deleteUser.rows.length === 0)
        {
            return res.status(404).json({message:"No one is deleted"});
        }
        else{
            return res.status(200).json({message:"Deleted the user"})
        }
    }
    catch(e){
            return res.status(500).json({message:"Internal error",err:e.message});
    }

})
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})