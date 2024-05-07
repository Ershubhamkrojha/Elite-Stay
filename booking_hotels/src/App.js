import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from  './Pages/home/Home.jsx';
import List from './Pages/list/List.jsx';
import Hotel from './Pages/hotel/Hotel.jsx';
import Login from './components/login/Login.jsx'
import Profile from  './components/userProfile/UserProfile.jsx'
import ContectPage from './components/contectPage/ContectPage.jsx';
import PaymentSucess from './Pages/paymentSucess/PaymentSucess.jsx'
import Register from './components/register/Register.jsx';
import TableList from './Pages/tableList/TableList.jsx'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path='/contect'element={<ContectPage/>}/>
        <Route path='/paymentsuccess'element={<PaymentSucess/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/table' element={<TableList/>}/>
      </Routes>

      </BrowserRouter>
    
    </div>
  );
}

export default App;
