
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home"
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import {SignUp} from "./pages/SignUp.js"
import { CartProvider } from './components/contextReducer.js';
import { MyOrder } from './pages/MyOrder.js';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
  
    <CartProvider>

    <Router>
    
    <div className="App">
    
    <Routes>
     
     <Route exact path="/" element={<Home/>}/>
     <Route exact path="/login" element={<Login/>}/>
     <Route exact path="/signup" element={<SignUp/>}/>
     <Route exact path="/myorders" element={<MyOrder/>}/>
     </Routes>
    </div>
    
    </Router>
    
    </CartProvider>
    
  );
}

export default App;
