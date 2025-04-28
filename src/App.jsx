import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListUser from './components/ListUser';
import CreateUser from './components/CreateUser';
import './App.css';

function App() {
  
  return (
    <>
    <div className="body">
    <BrowserRouter>
    <div className="header-div">
    <h1>Full-Stack App   &#9786;</h1>
    <nav>
      <ul>
        <li>
          <Link to="/" className="list-link">User List</Link>
        </li>
        <li>
          <Link to="user/create" className="create-link">Create User</Link>
        </li>
      </ul>
    </nav>
    </div>
      <Routes>
        <Route index element={<ListUser />} />
        <Route path="user/create" element={<CreateUser />} />
      </Routes>
     </BrowserRouter>
     <footer>
        <p>Copyright &copy; React25K</p>
      </footer>
     </div>  
    </>
  )
}

export default App;
