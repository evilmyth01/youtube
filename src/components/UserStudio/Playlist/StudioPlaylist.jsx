import React,{useState,useEffect} from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useCookies } from 'react-cookie'
import { useJwt } from "react-jwt";
import styles from './StudioPlaylist.module.css'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import date from 'date-and-time'

function StudioPlaylist() {
    const [videos, setVideos] = useState([]);
  const [cookies, setCookie] = useCookies(['accessToken']);
  const { decodedToken, isExpired } = useJwt(cookies.accessToken);

  const iconStyle={
    cursor: "pointer",
  }

  async function fetchAllVideo() {
    if (!decodedToken) {
      console.error('No decoded token available');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8000/api/v1/video/user/${decodedToken._id}`, {
        withCredentials: true,
        mode: "cors",
        headers: {
          // Add your headers here if needed
        }
      });
      console.log(res);
      if (res.status === 200) {
        setVideos(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (decodedToken && !isExpired) {
      fetchAllVideo();
    }
  }, [decodedToken, isExpired]);


  return (
    <div className={styles.wrapper}>
        <h1>studio video</h1>
        <div className={styles.upload}>
                    <div className={styles.uploadIcon}>
                    <UploadIcon sx={{fontSize:'50px'}}/>
                    </div>
                    <span style={{fontSize:'30px'}}>Upload Playlist</span>
                </div>

        {
            videos.length > 0 ? videos.map((video) => {
                return(
                    <div key={video._id} className={styles.videoCard}>
                        <img src={video.thumbnail} alt="thumbnail" />
                        <p>Published at: {date.format(new Date(video.createdAt), "DD/MM/YYYY")}</p>
                        <p className={styles.title}>{video.title}</p>
                        <p>{video.description}</p>
    
                        <div className={styles.icons}>
                        <EditIcon sx={iconStyle} />
                        <DeleteIcon sx={iconStyle}/>
                        <div className={styles.internalDiv}>
                        <VisibilityIcon sx={iconStyle}/>
                        <span className={styles.isPublished}>{video.isPublished ? "Published" : "Not Published"}</span>
                        </div>
                        <AttachMoneyIcon sx={{...iconStyle,color:'#42b043'}}/>
                        </div>
    
                    </div>
                )
            }) : <img src="/image.png" alt="No Videos Found" id={styles.noVideosImg} />
        }

    </div>
  )
}

export default StudioPlaylist