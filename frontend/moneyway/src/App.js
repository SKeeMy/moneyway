import './App.css';
import RegisterComp from './Components/RegisterPage/RegisterComp';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login';
import Dashboard from './Components/Content/Pages/Dashboard/Dashboard';
import Layout from './Components/Content/Layout';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterComp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/layout' element={<Layout />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
