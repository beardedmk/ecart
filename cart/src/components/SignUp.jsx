import React from "react";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const SignUp = ()=>{

 const navigate = useNavigate();
 useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/')
  }
})

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = async()=>{
        if(username!=="" && email !=="" && password!=="")
        {
        let result = await fetch("http://localhost:5000/register",{
            method:"post",
            body: JSON.stringify({username,email,password}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        if(result!=null)
        {
            localStorage.setItem("user",JSON.stringify(result));
            navigate('/');
        }
        }
    }
    return(
        <div className="signup">
            <h1>Sign Up</h1>
            <input type="text" name="username" id="" placeholder="username" onChange={(e)=>setUserName(e.target.value)} value = {username} />
            <input type="text" name="email" id="" placeholder="email-id" onChange={(e)=>setEmail(e.target.value)} value = {email}/>
            <input type="password" name="password" id="" placeholder="password" onChange={(e)=>setPassword(e.target.value)} value = {password}/>
            <button type="submit" onClick={signUp}>Sign Up</button>
        </div>
    );
} 

export default SignUp;