import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import date from 'date-and-time'
import { useNavigate } from 'react-router-dom'
import styles from './ChannelVideos.module.css'


function ChannelVideos() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([{}])

  async function fetchAllVideo(){
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/video/user/${id}`,{
        withCredentials: true,
        mode: "cors",
        headers: {
            
        }
      })
      // console.log(res)
      if(res.status === 200){
        setVideos(res.data.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(()=>{
    fetchAllVideo()
  },[])

  const handleClick = (id) => {
    navigate(`/video/${id}`)
  }

  return (
    <div className={styles.allVideosDiv}>

      {videos.map((video)=>{
        return(
          <div key={video._id} className={styles.videoCard}>
            <video height="200px" width="100%" className="video" controls src={video.videoFile}></video>
            <div className={styles.card}>
              <h4 style={{cursor:"pointer"}} onClick={()=>handleClick(video._id)}>{video.title}</h4>
              <div className={styles.videoDateAndTime}>
              <h6>{video.views} views</h6>
              <h6>{date.format(new Date(video.updatedAt), 'DD/MM/YYYY')}</h6>
              </div>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default ChannelVideos