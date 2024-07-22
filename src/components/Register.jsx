import React,{useState,useCallback} from 'react'
import Dropzone from 'react-dropzone'
import { set, useForm } from "react-hook-form"
import {useNavigate} from 'react-router-dom'
import Input from './Input';
import axios from 'axios';
import "../App.css"

function Register() {

  const navigate = useNavigate();
  
  const axiosConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
    const { register, handleSubmit, watch, formState: { errors },} = useForm()
    
    const Submit = async (data) => {
      data.avatar = data.avatar[0];
      data.coverImage = data.coverImage[0];
      console.log("second console ",data);
      try {
        const res = await axios.post('http://localhost:8000/api/v1/user/register', data, axiosConfig);
        console.log(res);
        if(res.status === 201){
          console.log('User registered successfully');
          navigate('/login');

        }
      } catch (error) {
        console.error(error);
      }
    };

    // const handleDrop = (acceptedFiles, dropzoneType) => {
    //     const modifiedFiles = acceptedFiles.map((file, index) => ({
    //       ...file,
    //       name: dropzoneType === 'avatar' ? 'avatar' : 'coverImage'
    //     }));
    //     if (dropzoneType === 'avatar') {
    //       setAvatarFiles(modifiedFiles);
    //       setAvatarParagraph('Avatar uploaded');
    //     } else {
    //       setCoverImageFiles(modifiedFiles);
    //       setCoverImageParagraph('Cover image uploaded');
    //     }
    //   };

    
  return (
    <>
    <h1>Register</h1>
    <form onSubmit={handleSubmit(Submit)}>
        
    <Input id="full-name" label="Full Name" {...register("fullName", { required: true })} />    
    <Input id="user-name" label="UserName" {...register("userName", { required: true })} />
    <Input id="e-mail" label="Email" {...register("email")}/>
    <Input id="password" label="Password" type="password" {...register("password")}/>
    <Input id="avatar" label="file" type="file" {...register("avatar")}/>
    <Input id="coverImage" label="file" type="file" {...register("coverImage")}/>

    

    <button type='submit'>submit</button>
    </form>

    </>
  )
}

export default Register