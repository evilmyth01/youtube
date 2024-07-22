import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { useNavigate,Outlet } from 'react-router-dom';
import styles from './Channel.module.css'
import {useCookies} from 'react-cookie'
import { useJwt } from 'react-jwt';
import { set } from 'react-hook-form';



function Channel() {
    const {id} = useParams();
    const [channelDetails,setChannelDetails] = useState({})
    const [subscribers,setSubscribers] = useState([{}])
    const navigate = useNavigate();
    const [cookie,setCookie] = useCookies(['accessToken'])
    const { decodedToken, isExpired } = useJwt(cookie.accessToken);
    const [isSubscribed,setIsSubscribed] = useState(false)



    const fetchChannelDetails = async () => {
        const res = await axios.get(`http://localhost:8000/api/v1/user/${id}`,{
            withCredentials: true,
            mode: "cors",
            headers: {
                
            }
        })
        if(res.status === 200){
            setChannelDetails(res.data.data)
        }
    }

    const fetchSubscribers = async () => {
        const res = await axios.get(`http://localhost:8000/api/v1/subscription/subscribers/${id}`,{
            withCredentials: true,
            mode: "cors",
            headers: {
                
            }
        })
        if(res.status === 200){
            setSubscribers(res.data.data)
        }
    }
    
    useEffect(()=>{
        fetchChannelDetails()
        fetchSubscribers()
    },[])

    

    const handleNavigate = (path) => {
        navigate(`/channel/${id}/${path}`)
    }

    // console.log("subscribers",subscribers);
    // console.log("decodedToken",decodedToken )

    useEffect(()=>{
        console.log("subscribers",subscribers);
        const isSubscribed = subscribers?.allSubscribers?.find(subscriber => subscriber._id === decodedToken._id)
        console.log("isSubscribed ",isSubscribed)
        if(isSubscribed){
            setIsSubscribed(true)
        }
    },[subscribers])

    const handleSubscribe = async (channelId) => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/subscription/toggle/${channelId}`,{},{
            withCredentials: true,
            mode: "cors",
        })
        if(res.data.message === 'Subscribed to channel successfully'){
            setIsSubscribed(true)
        }else{
            setIsSubscribed(false)
        }
        } catch (error) {
            console.log("error ",error)
        }
    }
    


  return (
    <Sidebar>
        <div className={styles.outerDiv}>
            <div className={styles.bannerAndDetails}>

                <div className={styles.banner}>
                    <img src={channelDetails.avatar} alt="banner" className={styles.image} />
                </div>

                <div className={styles.details}>
                <Avatar alt={channelDetails.userName} src={channelDetails.avatar} sx={{marginLeft:4, marginRight:1.1, width: 90, height: 90, border: '2px solid black', fontSize: 10}}
              />
                <div className={styles.detailsContent}>
                    <h4>{channelDetails.userName}</h4>
                    <h5 style={{fontSize:"20px",fontWeight:"400"}}>{subscribers.subscribersCount} Subscribers</h5>
                </div>

                <button onClick={()=>handleSubscribe(channelDetails._id)}>{isSubscribed?'Subscribed':'Subscribe'}</button>
                </div>

                <div className={styles.listOptions}>
                    <ul>
                        <li onClick={()=>handleNavigate("home")}>Home</li>
                        <li onClick={()=>handleNavigate("videos")}>Videos</li>
                        <li onClick={()=>handleNavigate("playlist")}>Playlists</li>
                        <li onClick={()=>handleNavigate("community")}>Community</li>
                        <li onClick={()=>handleNavigate("about")}>About</li>
                    </ul>
                </div>

            </div>


            <div className={styles.outlets}>
                <Outlet />
            </div>

        </div>
    </Sidebar>
  )
}

export default Channel