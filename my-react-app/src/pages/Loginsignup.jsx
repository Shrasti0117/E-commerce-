import React, { useState } from 'react'
import './CSS/login.css'

const Loginsignup = () => {

const [state,setstate] = useState("Login");
const [formData,setFormdata] = useState({
  username:"",
  password:"",
  email:""
})

const changeHandler = (e) =>{
  setFormdata({...formData,[e.target.name]:e.target.value})
}

const login = async ()=>{
   console.log("Login function Executed",formData);
   let responseData = await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then((response) => response.json());

  if (responseData.success) {
    localStorage.setItem('auth-token', responseData.token);
    window.location.replace("/");
  } else {
    alert(responseData.errors)
  }
}

const signup = async () => {
  console.log("Signup function Executed ", formData);
  let responseData = await fetch('http://localhost:4000/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then((response) => response.json());

  if (responseData.success) {
    localStorage.setItem('auth-token', responseData.token);
    window.location.replace("/");
  } else {
    alert(responseData.errors)
  }
}

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="your Name" /> : null}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email address" />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account ? <span onClick={()=>{setstate("Login")}}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account <span onClick={()=>{setstate("Sign Up")}}>Click here</span>
          </p>
        )}
      
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <label>I agree to the terms and conditions</label>
        </div>
      </div>
    </div>
  )
}


export default Loginsignup;


