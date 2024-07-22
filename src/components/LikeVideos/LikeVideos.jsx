import React,{useState,useEffect} from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import styles from './LikeVideos.module.css'
import date from 'date-and-time'
import { useNavigate } from 'react-router-dom'

function LikeVideos() {
    const [videos, setVideos] = useState([{}])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    async function fetchLikedVideos(){
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/like/videos`,{
                withCredentials: true,
                mode: "cors",
                headers: {
                    
                }
            })
            console.log("res", res)
            setVideos(res.data.data[0].video)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching liked videos:', error);
        }
    }
    console.log("videos ",videos)

    const handleClick = (e) => {
        navigate(`/video/${e}`);
      };

    useEffect(()=>{
        fetchLikedVideos()
    },[])

  return (
    <Sidebar>
      {
        loading? <h1>Loading...</h1>:
        <div className={styles.page}>
        {videos.map((video) => (
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
                  <span>
                    {date.format(new Date(video.updatedAt), "DD/MM/YYYY")}
                  </span>
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

export default LikeVideos