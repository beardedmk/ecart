import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import Update from './components/Update';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateComp from "./components/PrivateComp";



function App() {
  
  return (
    <>

    <BrowserRouter>
    <Header />
    <div className='body'>
    <Routes>

      <Route element = {<PrivateComp />}>
          <Route path='/' element = {<ProductList/>} />
          <Route path='/update/:id' element = {<Update/>} />
          <Route path='/logout' element = {<h1> logout</h1>} />
          <Route path='/profile' element = {<h1> profile</h1>} />
          <Route path='/add-product' element = {<AddProduct/>}/>
      </Route>

      <Route path='/signup' element = {<SignUp/>}/>
      <Route path='/login' element = {<Login/>} />

    </Routes>
    </div>
    </BrowserRouter>
    <Footer />
    </>
  );
}

export default App;
