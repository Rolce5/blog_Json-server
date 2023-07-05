import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ManagePost from './ManagePost';
import PostCreate from './PostCreate';
import PostEdit from './PostEdit';
import Home from './Home';
import Login from './Login';
import Show from './Show';
import Register from './Register';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
    
      <ToastContainer theme='colored'></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/post/:postid' element={<Show/>}></Route>
          <Route path='/post/manage' element={<ManagePost />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/post/create' element={<PostCreate />}></Route>
          <Route path='/post/edit/:postid' element={<PostEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
