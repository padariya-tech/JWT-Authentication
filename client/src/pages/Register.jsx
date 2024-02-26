import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Register() {
  // const [name,Setname] = useState("");
  // const [email,setEmail] = useState("");
  // const [password,setPassword] = useState("");
  const navigate=useNavigate()
  const [data,setData]=useState({
    name:'',
    email:'',
    password:''
  })
  
  const registerUser= async (e)=>{
    e.preventDefault()
    const {name,email,password} = data
    try {
      const {data} = await axios.post('/register',{
        name,email,password
      })
      if(data.error){
        toast.error(data.error)
      }
      else
      {
        setData({})
        toast.success("Register Successful Welcome")
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name </label>
        <input type="text" placeholder='Enter Name' value={data.name} 
        onChange={(e)=>setData({...data,name:e.target.value})}/>
        <br />
        <label>Email </label>
        <input type="text" placeholder='Enter email' value={data.email}
        onChange={(e)=>setData({...data,email:e.target.value})}/>
        <br />
        <label>Password </label>
        <input type="text" placeholder='Enter password' value={data.password} 
        onChange={(e)=>setData({...data,password:e.target.value})}/>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Register