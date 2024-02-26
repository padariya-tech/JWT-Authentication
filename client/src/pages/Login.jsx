import React,{useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Login() {
 const navigate = useNavigate()
  // const [email,setEmail] = useState("");
  // const [password,setPassword] = useState("");

  const [data,setData] = useState({
    email:'',
    password:''
  })
  const loginUser= async(e)=>{
    e.preventDefault();
    const {email,password} = data
    try {
      const {data} = await axios.post('/login',{
        email,password
      })
      if(data.error){
        toast.error(data.error)
      }
      else
      {
        setData({}) // reset form
        toast.success("login Successful Welcome")
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
   
  }
  return (
    <div>
        <form onSubmit={loginUser}>
       
        <label>Email </label>
        <input type="text" placeholder='Enter email' value={data.email}
        onChange={(e)=>setData({...data,email:e.target.value})}
        />
        <br />
        <label>Password </label>
        <input type="text" placeholder='Enter password' value={data.password} 
        onChange={(e)=>setData({...data,password:e.target.value})} 
        />
        <br />
        <button type='submit'>Login</button>
      </form>

    </div>
  )
}

export default Login