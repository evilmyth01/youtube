import React, { useEffect,useState } from 'react'
import styles from './ChannelHome.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import date from 'date-and-time';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function ChannelHome() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [allVideos, setAllVideos] = useState([{}])
  const [lastUploadedVideo, setLastUploadedVideo] = useState({})

  async function fetchLastUploadedVideo(){
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/video/user/${id}`,{
      withCredentials: true,
      mode: "cors",
      headers: {
          
      }
    })
    setAllVideos(res.data.data)
    setLastUploadedVideo(res.data.data[0])

    // make a logic so that only 5 or 6 videos are fetched and displayed in the list right now there are all the videos of the user

    } catch (error) {
      console.error('Error fetching last uploaded video:', error);
    }
    
  }

  const handleClick = (id) => {
    // console.log("id ",id)
    navigate(`/video/${id}`)
  }

  useEffect(()=>{
    fetchLastUploadedVideo()
  },[])

  return (
    <>
    <div className={styles.lastUploadedVideo}>

      <div className={styles.videoContainer}>
        <video style={{borderRadius:"10px"}} height="100%" width="100%" controls src={lastUploadedVideo.videoFile}></video>
      </div>

      <div className={styles.lastVideoDetails}>
        <h4 onClick={()=>handleClick(lastUploadedVideo._id)} style={{cursor:"pointer"}}>{lastUploadedVideo.title}</h4>
        <div className={styles.viewsAndDate}>
        <p>{lastUploadedVideo.views} views</p>
        <p>{date.format(new Date(lastUploadedVideo.updatedAt), 'DD/MM/YYYY')}</p>
        </div>
        <p>{lastUploadedVideo.description}</p>
      </div>

    </div>

    <div className='videoList'>

      <h3 id={styles.videoListH3}>Videos</h3>

      {allVideos.map((video)=>{
        return(
          <div key={video._id} className={styles.videoOuterDiv}>
            <video width="100%" style={{borderRadius:"8px"}} className={styles.listVideos} controls src={video.videoFile}></video>
            <div className={styles.videoListDetails}>
              <p style={{cursor:"pointer"}} onClick={()=>handleClick(video._id)}>{video.title}</p>
              {/* <h5 style={{cursor:"pointer"}} onClick={()=>handleClick(video._id)}>{video.owner}</h5> */}
              <div className={styles.viewsAndDate2}>
              <h6>{video.views} views</h6>
              <h6>{date.format(new Date(video.updatedAt), 'DD/MM/YYYY')}</h6>
              </div>
            </div>
          </div>
        )
      })}


    </div>
    </>

  )
}

export default ChannelHome