import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
function Header() {

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  }

  return (
    <div className='header'>
      <ul className='hList'>
        {auth ?
          <div>
            <li><Link to='/'>Home </Link></li>
            <li><Link to='/add-product'>Add Product</Link></li>
            <li><Link to='/'>Update</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
              <li><Link to='/signup' onClick={logout}>Logout</Link> <div className='uName'>({JSON.parse(auth).username})</div> </li>
        </div>
          : <div className='menu'>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Sign UP</Link></li>
          </div>
        }
      </ul>
    </div>
  )
}

export default Header