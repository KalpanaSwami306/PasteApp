import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import Paste from './Component/Paste';
import ViewPaste from './Component/ViewPaste';

const router = createBrowserRouter([
  {
    path:'/',
    element:
    <div>
      <Navbar/>
      <Home/>
    </div>
  },{
    path:'/pastes',
    element:
    <div>
      <Navbar/>
      <Paste/>
    </div>
  },{
    path:'/pastes/:id',
    element:
    <div>
      <Navbar/>
      <ViewPaste/>
    </div>
  }
]);
function App() {
  return (
   <div>
   <RouterProvider router={router}/>
   </div>
  )
}

export default App
