import {configureStore} from "@reduxjs/toolkit";
import userReducer  from "./userSlice";
const store= configureStore({
    reducer:{
        userInfo:userReducer,
    },
    devTools:true,
})


export default store;