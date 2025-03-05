import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  auth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addTask: (state, action) => {
      console.log(action.payload)
      const add = [...state.user.personas, action.payload];
      state.user.personas = add;
      console.log(add)
      // updateLocalStorage(state.user);

    },
    deleteTask: (state, action) => {
      console.log(action.payload)
      console.log(state.user.personas)
      const updatedTasks = state.user.personas.filter((_,id) => id != action.payload);
      console.log(updatedTasks,"wow starttttt")
      state.user = { ...state.user, personas: updatedTasks };
      // updateLocalStorage(state.user);
    },
    updateTask: (state, action) => {
      console.log(action.payload)

      const { index, updatedTask } = action.payload;
      const updatedTasks = [...state.user.personas];
      console.log(updatedTasks)
      updatedTasks[index] = updatedTask;
      state.user = { ...state.user, personas: updatedTasks }; 
      // updateLocalStorage(state.user);
    },
    setUser: (state, action) => {
      console.log(action.payload)

      state.user = action.payload;
      updateLocalStorage(state.user);
    },
    setauth: (state, action) => {
      
      state.auth = action.payload;
    },
  },
});

const updateLocalStorage = (updatedUser) => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((user) => user.email === updatedUser.email);
  if (userIndex !== -1) {
    users[userIndex] = updatedUser;
    localStorage.setItem("users", JSON.stringify(users));
  }
};

export const { addTask, deleteTask, setUser, setauth, updateTask } = userSlice.actions;
export default userSlice.reducer;
