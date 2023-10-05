
import {Routes,Route} from 'react-router-dom';

//components

import SetPassword from './components/SetPassword';
import Login from "./components/login";
import SendEmail from "./components/SendEmail";
import SendOTP from "./components/SendOTP";
import ResetPassword from './components/ResetPassword';

import UserManagement from './components/UserManagement'
import Products from './components/Products'
import AddProduct from './components/productModule/AddProduct'
import ViewProducts from './components/productModule/ViewProducts';
import EditProduct from './components/productModule/EditProducts';
import DeleteProduct from './components/productModule/DeleteProduct';


import Order from './components/orderModule/Order'
import SalesOrder from './components/orderModule/SalesOrder'
import RentOrder from './components/orderModule/RentOrder'
/*  import ReturnOrder from './components/orderModule/ReturnOrder' */

import Layout from './commonComponents/Layout'


function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Home/>}/> */}
        <Route path="/" element={<Login/>}/>
        <Route path="/SetPassword/:token" element={<SetPassword/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/SendEmail" element={<SendEmail/>}/>
        <Route path="/Reset" element={<SendOTP/>}/>
        <Route path="/ResetPassword" element={<ResetPassword/>}/>
       
        {/* <Route path="/ViewProducts" element={<ViewProducts/>}/> */}

        <Route element={<Layout />}>

          
          <Route path="/UserManagement" element={<UserManagement/>}/>


          <Route path="/Product" element={<Products/>}/>
          <Route path="/AddProduct" element={<AddProduct/>}/>
          <Route path="/ViewProducts" element={<ViewProducts/>} />
          <Route path="/EditProducts" element={<EditProduct/>}/>
          <Route path="/DeleteProducts" element={<DeleteProduct/>}/>

          
          <Route path="/Order" element={<Order/>}/>
          <Route path="/SalesOrder" element={<SalesOrder/>}/>
           <Route path="/RentOrder" element={<RentOrder/>}/>
{/*          <Route path="/ReturnOrder" element={<ReturnOrder/>}/> */}
      
        </Route>
        </Routes>
    </div>
  );
}
export default App;








