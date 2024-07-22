import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Input from './Input';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Login() {
    const[value,setValue] = useState("");
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    
      const Submit = async(data)=>{
        console.log(data)
        try {
          const res = await axios.post('http://localhost:8000/api/v1/user/login', data);
          console.log(res);
          if(res.status === 200){
            console.log('User logged in successfully');
            localStorage.setItem('accessToken',res.data.data.accessToken);
            localStorage.setItem('refreshToken',res.data.data.refreshToken);
            navigate('/');
          }
        } catch (error) {
          console.log("error ",error)
          alert("Invalid credentials");
        }
        
      }

  return (
    <>
    <h1>Login</h1>
    <form onSubmit={handleSubmit(Submit)}>
    <Input id="user-name" label="UserName" {...register("name", { required: true })}
    aria-invalid={errors.name ? "true" : "false"}
    />
    {errors.name?.type === "required" && (
        <p role="alert">First name is required</p>
      )}
    <Input id="e-mail" label="Email" {...register("email")}/>
    <Input id="password" label="Password" type="password" {...register("password")}/>
    <button type='submit'>submit</button>
    </form>
    <h2>{value}</h2>
    </>
  )
}

export default Login