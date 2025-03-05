import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Home';
import Signup from './signup';
import Login from './Login';
import ProtectedRoutes from './ProtectedRoutes';
import TaskDetail from './taskDetail';
import UserDashboard from './userDashBoard';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
function App(){
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route element={<ProtectedRoutes/>}>
      <Route path='/:user_id' element={<UserDashboard/>}></Route>
      <Route path='/:user_id/:id' element={<TaskDetail/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    <ToastContainer></ToastContainer>
    </>
  );
}

export default App;