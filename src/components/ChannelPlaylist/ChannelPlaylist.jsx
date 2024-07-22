import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './ChannelPlaylist.module.css'
import { set } from 'react-hook-form'

function ChannelPlaylist() {

  const { id } = useParams()
  const [playlist, setPlaylist] = useState([{}])
  const [loading, setLoading] = useState(true)

  async function fetchPlaylist(){
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/playlist/user-playlist/${id}`,{
        withCredentials: true,
        mode: "cors",
        headers: {
            
        }
      })
      console.log("res",res.data.data);
      setPlaylist(res.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  }

  useEffect(()=>{
    fetchPlaylist()
  },[])

  return (
    <div className={styles.parentDiv}>
      {
        loading? <h1>Loading...</h1>:
        playlist.map((playlist)=>{
          return(
            <div className={styles.playlistContainer} key={playlist._id}>
              <div className={styles.imageContainer}>
              <img style={{height:"200px",width:"100%",borderRadius:"8px"}} src={playlist.videos[0].thumbnail} alt="playlist" />
              <div className={styles.overlay}>{playlist.videos.length} videos</div>
              </div>
              <div className={styles.playListDetails}>
              <p>{playlist.description}</p>
              <p>View Full Playlist</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ChannelPlaylist