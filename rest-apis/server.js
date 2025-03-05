const express = require('express');
const app = express();
const fs=require('fs');
app.use(express.json());
const users=require('./user.json')

app.get('/getUsers', (req, res) => {
    if (users && users.length > 0) {
        return res.status(200).json(users);
    } else {
        return res.status(404).json({ message: "No users in the array" });
    }
});

app.get('/getUser/:id', (req, res) => {
    const { id } = req.params;
    const user = users.filter((data) => data.id == id);
    if (user.length !== 0) {
        return res.status(200).json(user);
    } else {
        return res.status(404).json({ message: "no user is found in this id" });
    }
});

app.post('/insertData', (req, res) => {
    const { id,name, age, role } = req.body;
    if (typeof id !== "number" ||name.trim() === "" || typeof age !== "number" || age <= 0 || role.trim() === "") {
        return res.status(417).json({ message: "all the data should be entered,age must be a positive number and id be number" });
    } else {
        users.push({ id, name, age: Number(age), role });

        return res.status(200).json({ message: "Data inserted successfully" });
    }
});
app.delete('/deleteUser',(req,res)=>{
    const {id} = req.body;
    if(typeof id !=="number"){
        return res.status(417).json({message:"id must be number"})
    }
    // let isId=false;
    // const deleteUser=[...users].filter((data)=>{
    //     if(data.id==id)
    //         isId=true;
    //    return data.id!==id})
    // if(isId)
    // {
    //     users=deleteUser;
    //     return res.status(200).json({message:"The data is deleted"})
    // }
    // else{
    //     return res.status(404).json({message:"The id is not found"})
    // }
    const deleteUser = users.findIndex((data)=>data.id==id);
    if(deleteUser!=-1)
    {
        users.splice(deleteUser,1);
        return res.status(200).json({message:"The data is deleted"})
    }
    else{
            return res.status(404).json({message:"The id is not found"})
        }
})
app.put('/updateUser/:id', (req, res) => {
    const { id } = req.params;
    const updateUser = users.findIndex((data) => data.id == Number(id));
    if (updateUser === -1) {
        return res.status(404).json({ message: "ID not found" });
    }
    const { name, age, role } = req.body;
    if(name===undefined || age===undefined || role===undefined )
    {
        return res.status(404).json({message:"All the field should be present on that any one or more key can be give"});
    }
    if (name.trim() === "" &&  role.trim() === "" && (age === 0||age==="")) {
            if (typeof age === "number" && age < 0) {
                return res.status(417).json({ message: "Age should be a positive number" });
            }
                return res.status(417).json({ message: "At least one field  must be provided" });
        }
    if (name && name.trim() !== "") {
        users[updateUser].name = name;
    }
    if (typeof age === "number" && age > 0) {
        users[updateUser].age = age;
    }
    if (role && role.trim() !== "") {
        users[updateUser].role = role;
    }

    return res.status(200).json({ message: "The data has been updated successfully" });
});
console.log(users)
app.listen(8080, () => {
    console.log("The server is running on port 8080");
});
