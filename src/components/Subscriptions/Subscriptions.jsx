import React,{useState,useEffect} from 'react'
import Sidebar from '../Sidebar'
import styles from './Subscriptions.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import  Avatar  from '@mui/material/Avatar'
import date from "date-and-time";

function Subscriptions() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [subscriptions, setSubscriptions] = useState([{}])
  const [channelDetails, setChannelDetails] = useState({})

  const fetchSubscriptions = async()=>{
    try {
      const res = await axios.get('http://localhost:8000/api/v1/subscription/subscribed',{
        withCredentials: true,
        mode: "cors",
        headers: {
            
        }
      })
      console.log("subscribed channels ",res.data.data.subscribedChannels);
      console.log("channel details ",res.data.data.channelsDetails);
      setSubscriptions(res.data.data.subscribedChannels)
      setChannelDetails(res.data.data.channelsDetails)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  
  }

  useEffect(()=>{
    fetchSubscriptions()
  },[])

  return (
    <Sidebar>
      {
        loading?<h1>Loading...</h1>:
        <>
          <h1>Subscribed Channels</h1>
        <div className={styles.outerDiv}>
          {
            channelDetails.map((channel,index)=>{
              return(
                  <div key={channel._id} className={styles.channelContainer}>
                  <div className={styles.imgContainer}>
                    <img height='100%' width='100%' style={{borderRadius:'50%',boxShadow: '0px 4px 10px rgba(0, 0, 0, 5)'}} src={channel.coverImage} alt="avatar" />
                  </div>
                  
                  <div className={styles.channelInfo}>
                  <Avatar alt={channel.userName} src={channel.avatar} sx={{width: 45, height: 45, border: '2px solid black', fontSize: 10,cursor:"pointer",boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)'}} />                 
                  <div className={styles.channelDetails}>
                    <h4>{channel.userName}</h4>
                    <h4>{date.format(new Date(channel.createdAt), "DD/MM/YYYY")}</h4>
                  </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        </>
      }
    </Sidebar>
  )
}

export default Subscriptions