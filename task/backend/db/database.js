const {Pool} = require('pg')
const dotenv =require('dotenv')
dotenv.config()

const pool = new Pool({
    connectionString:process.env.db_url
})
pool.connect().then(()=>{console.log("Db connected successfully")})
.catch((e)=>{console.log("Error while connecting db")})
module.exports = pool;