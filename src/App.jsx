import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './App.css'
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import Explore from './components/Explore';
import Subscriptions from './components/Subscriptions/Subscriptions';
import Video from './components/Video/Video';
import Channel from './components/Channel/Channel';
import ChannelHome from './components/ChannelHome/ChannelHome';
import ChannelVideos from './components/ChannelVideos/ChannelVideos';
import ChannelPlaylist from './components/ChannelPlaylist/ChannelPlaylist';
import ChannelCommunity from './components/ChannelCommunity/ChannelCommunity';
import ChannelAbout from './components/ChannelAbout/ChannelAbout';
import Library from './components/Library/Library';
import History from './components/History/History';
import LikeVideos from './components/LikeVideos/LikeVideos';
import UserStudio from './components/UserStudio/UserStudio';
import StudioVideo from './components/UserStudio/StudioVideo/StudioVideo';
import StudioDashboard from './components/UserStudio/Dashboard/StudioDashboard';
import StudioPlaylist from './components/UserStudio/Playlist/StudioPlaylist';
import StudioComments from './components/UserStudio/Comments/StudioComments';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute>< Dashboard/></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/video/:id" element={<Video />} />

        <Route path="/channel/:id" element={<Channel />} >
        <Route index element={<ChannelHome />} />
          <Route path='home' element={<ChannelHome />} />
          <Route path='videos' element={<ChannelVideos />} />
          <Route path='playlist' element={<ChannelPlaylist />} />
          <Route path='community' element={<ChannelCommunity />} />
          <Route path='about' element={<ChannelAbout />} />
        </Route>

        <Route path="/user-studio" element={<UserStudio />} >
          <Route index element={<StudioDashboard />} />
          <Route path='dashboard' element={<StudioDashboard />} />
          <Route path='video' element={<StudioVideo />} />
          <Route path='playlist' element={<StudioPlaylist />} />
          <Route path='comment' element={<StudioComments />} />
        </Route>



        <Route path="/library" element={<Library />} />
        <Route path="/history" element={<History />} />
        <Route path="/like-videos" element={<LikeVideos />} />


      </Routes>

    </>
  )
}

function ProtectedRoute({children}){
  if(localStorage.getItem('accessToken')){
    return children
  }else{
    return <Navigate to='/login' />
  }
}

export default App
