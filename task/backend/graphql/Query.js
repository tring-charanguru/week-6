const db=require("../db/database")
const bcrypt = require('bcryptjs');

const query = {
  getUser: async (_, { email, password }) => {
    try {
      const userResult = await db.query('SELECT * FROM users WHERE email=$1', [email]);
      const user = userResult.rows[0];

      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }const personaResult = await db.query('SELECT id,user_id, name,image,activities,painPoints,needs,motivation,description,quotes FROM personas WHERE user_id=$1 and time IS NULL', [user.user_id]);
      user.personas  = personaResult.rows;
      return user;
    } catch (e) {
      throw new Error(e.message || "Data not found");
    }
  }
};

module.exports = query;
