import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

const ProtectedRoutes=()=>{
    const auth=useSelector((state)=>state.userInfo.auth);
    return auth?<Outlet/>:<Navigate to='/login'/>
}

export default ProtectedRoutes;