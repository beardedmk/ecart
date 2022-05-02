import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Login(){

const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const navigate = useNavigate();

useEffect(() => {
  
    const auth = localStorage.getItem('user');

    if(auth) {navigate('/')}
})


const handleClick = async () => {
    let result = await fetch('http://localhost:5000/login', {
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
        'Content-Type': 'application/json'
        }
    });
    result = await result.json();
    console.log(result);
    if(result)
    {
        localStorage.setItem("user",JSON.stringify(result));
        navigate('/');
    }
    else{
        alert("please write correct")
    }
}



  return (
    <div className='login'>
        <h1 className='menu'>Login</h1>

            <input className='menu' type="text" name="" id="" 
            placeholder='Enter your Email'
            onChange={(e)=>{setEmail(e.target.value)}} value ={email} />

            <input className='menu' type="text" name="" id="" 
            placeholder='Enter your password'
            onChange={(e)=>{setPassword(e.target.value)}} value = {password}/>

            <button className='menu' onClick={handleClick}>Login</button>
    </div>
  );
}

export default Login;