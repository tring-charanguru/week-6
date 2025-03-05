import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./Table";
import Error from "./Error";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Table/>}></Route>
        <Route path="*" element={<Error/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
