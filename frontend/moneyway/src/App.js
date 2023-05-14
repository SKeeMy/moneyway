import './App.css';
import RegisterComp from './Components/RegisterPage/RegisterComp';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterComp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
