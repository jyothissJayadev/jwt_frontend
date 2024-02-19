import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
function App() {

const router =createBrowserRouter([
  {
    path:'/',
    element:<div><Login/></div>
  },
  {
    path:'/register',
    element:<div><Register/></div>
  },
  {
    path:'/welcome',
    element:<div><Welcome/></div>
  }
])
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
