import React,{useEffect,useState} from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import  Avatar  from '@mui/material/Avatar'
import {useNavigate} from 'react-router-dom'
import styles from './History.module.css'
import date from 'date-and-time'

function History() {
    const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState([{}])
    const navigate = useNavigate()

    async function fetchHistory(){
        try {
            const res = await axios.get("http://localhost:8000/api/v1/user/",{
                withCredentials: true,
                mode: "cors",
                headers: {
                    
                }
            })
            setHistory(res.data.data.history)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    }


    useEffect(()=>{
        fetchHistory()  
    },[])

    const handleNavigate = (id) => {
        navigate(`/video/${id}`)
    }

    const handleChannelNavigate = (id) => {
        navigate(`/channel/${id}`)
    }

   
    
  return (
    <Sidebar>
        <h1>History</h1>
        {
            loading? <h1>Loading...</h1>:
            <div className={styles.page}>
        {history.map((video) => (
          <div
            key={video._id}
            className={styles.videoCard}
            onClick={() => handleClick(video._id)}
          >
            <video
              poster={video.thumbnail}
              className={styles.video}
              controls
              src={video.videoFile}
            ></video>
            <div className={styles.card}>
              <Avatar
                title={video.owner.userName}
                alt={video.owner.userName}
                src={video.owner.avatar}
                sx={{
                  marginLeft: 0.8,
                  marginRight: 1.5,
                  width: 44,
                  height: 44,
                  fontSize: 10,
                }}
              />
              <div className={styles.cardDetails}>
                <span title={video.title} id={styles.titleId}>
                  {video.title}
                </span>
                <span title={video.owner.userName}>
                  {video.owner.userName}
                </span>
                <div className={styles.viewsAndDate}>
                  <span id={styles.dateId}>{video.views} views</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
        }
    </Sidebar>
  )
}

export default History