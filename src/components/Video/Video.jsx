import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import axios from "axios";
import styles from "./Video.module.css";
import date from "date-and-time";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ShortcutSharpIcon from "@mui/icons-material/ShortcutSharp";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {useCookies} from 'react-cookie';
import { set } from "react-hook-form";


function Video() {
  const { id } = useParams();
  const navigate = useNavigate();
  const uuid = uuidv4();
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState([]);
  const [comments, setComments] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [videoLike,setVideoLike] = useState(0);
  const [videoDislike,setVideoDislike] = useState(false);
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [subscribed,setSubscribed] = useState(false);
  const [commentContent,setCommentContent] = useState('');




  async function fetchData() {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/video/${id}`,
        {
          withCredentials: true,
          mode: "cors",
          headers: {
            
          },
        }
      );
      // Log the response data to the console
      setVideo(res.data.data);
      setLoading(false);
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error fetching data:", error);
    }
  }

  async function fetchComments(){
    try {
      // Send a GET request to the specified URL
      const comment = await axios.get(`http://localhost:8000/api/v1/comment/video/${id}`);
      // Log the response data to the console
      // setComments(res.data.data);
      // setLoading(false);
      setComments(comment.data.data.docs);
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error fetching data:", error);
    }
  }

  async function fetchAllVideos(){
    try {
      // Send a GET request to the specified URL
      const res = await axios.get("http://localhost:8000/api/v1/video", {
        withCredentials: true,
        mode: 'cors',
        headers: {
        }
      });
      // Log the response data to the console
      setAllVideos(res.data.data.docs);
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error fetching data:', error);
    }
  }

  async function fetchTotalLikes(){
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/like/totalLikes/${id}`, {
        withCredentials: true,
        mode: 'cors',
        headers: {
        }
      });
      // console.log("total likes ",res);
      if(res.data.statusCode===200){
        setVideoLike(res.data.data);
      }
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error fetching data:", error);
    }

  }

  async function isSubscribed(){
    //change the id by decoding the token and making a store
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/subscription/subscribers/${video.owner._id}`, {
        withCredentials: true,
        mode: 'cors',
        headers: {
          
        }
      });
      if(res.status===200){
        setSubscribed(true);
      }
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error fetching data:", error);
    }
  
  }

  async function updateViewsAndHistory(){
    try{
      const res = await axios.post(`http://localhost:8000/api/v1/video/user/${video._id}`,{},{
        withCredentials: true,
        mode: 'cors',
        headers: {
          
        }
      })
      // console.log("update views and history ",res);
    }catch(error){
      console.error("Error updating views and history:", error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchComments();
    fetchAllVideos();
    fetchTotalLikes();
  }, []);

  useEffect(()=>{
    if(!loading){
      updateViewsAndHistory();
      isSubscribed();
    }
  },[loading])

  // console.log("video ",video);
  // console.log("comments ",comments);

  const handleClick = (videoId) => {
    // console.log("id ",_id);
    navigate(`/video/${videoId}`)
    window.location.reload();
    // navigate(`/video/${videoId}`, {
    //   state: { key: uuid }
    // });
  }

  const handleEvents = async (object, type,objectId) => {
    if(object === "video" && type === "like"){
      try {
        const res = await axios.post(
          `http://localhost:8000/api/v1/like/toggle/v/${objectId}`,
          {},
          {
            withCredentials: true,
            mode: "cors",
            headers: {
              
            },
          }
        );
        // console.log("res ",res);
        if(res.data.message==='Unliked the video'){
          setVideoLike((prev)=>{return prev-1});
        }else{
          setVideoLike((prev)=>{return prev+1});
        }
      } catch (error) {
        // Handle errors if the request fails
        console.error("Error fetching data:", error);
      }
    }
  }

  const handleChannel = (channelId) => {
    // console.log("channel id ",channelId);
    navigate(`/channel/${channelId}`)
  }

  const handleSubscribe = async () => {
    setSubscribed((prev)=>{return !prev});
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/subscription/toggle/${video.owner._id}`,{},{
        withCredentials: true,
        mode: 'cors',
        headers: {
          
        }
      })
      if(res.data.message==="Subscribed to channel successfully"){
        setSubscribed(true);
      }else{
        setSubscribed(false);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  }

  const handleCommentSubmit = async () => {
    // console.log("comment content ",commentContent);
    let trimmedStr = commentContent.trim().replace(/^\s+|\s+$/g, '');
    // console.log("trimmed string ",trimmedStr);

    if(trimmedStr.length===0){
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8000/api/v1/comment/${id}`,{commentBody:trimmedStr},{
        withCredentials: true,
        mode: 'cors',
        headers: {
        },
      })
      // console.log("comment res ",res);
      if(res.status===200){
        setCommentContent('');
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }

  return (
    <Sidebar>
      {
        loading ? <h1>Loading...</h1> : 
        <>
          <h1>Video id: {id}</h1>

  <div className={styles.outer}>
  <div className={styles.videoAndOwner}>
    {/* <h3>video and owner</h3> */}
    <div className="videoData">
      <video
        className={styles.video}
        controls
        src={video.videoFile}
        poster={video.thumbnail}
      ></video>

      <h4>{video.description}</h4>

      <div className={styles.videoDetails}>
        <div className={styles.videoData}>
          <span className={styles.views}>{video.views} views</span>
          <span>
            .{date.format(new Date(video.updatedAt), "DD/MM/YYYY")}
          </span>
        </div>

        <div className={styles.options}>
          <ThumbUpOffAltIcon
            className={styles.icon}
            sx={{ fontSize: 26,fill: videoLike?'blue':'black',cursor:'pointer' }}
            onClick={()=>handleEvents("video","like",id)}
          />{" "}
          <span>{videoLike}</span>
          <ThumbDownOffAltIcon className={styles.icon} sx={{fontSize:26,color: videoDislike?'blue':'black',cursor:'pointer',fontWeight:100}} onClick={()=>setVideoDislike(prev=>!prev)} />{" "}
          <span>Dislike</span>
          <ShortcutSharpIcon className={styles.icon} sx={{fontSize:26,cursor:'pointer'}} onClick={()=>handleEvents("video","share",id)}/> <span>Share</span>
          <PlaylistAddIcon className={styles.icon} sx={{fontSize:26,cursor:'pointer'}} onClick={()=>handleEvents("video","playlist",id)}/> <span>Save</span>
        </div>
      </div>
    </div>

    <div className={styles.ownerDetails}>
      <div className={styles.ownerAvatar}>
        <Avatar onClick={()=>handleChannel(video.owner._id)} src={video.owner.avatar} sx={{width: 40,height: 40,border: "2px solid black",fontSize: 10,cursor:'pointer'}}/>
      </div>
      <div className={styles.nameAndSubscribers}>
        <div className={styles.userInfo}>
          <h4 onClick={()=>handleChannel(video.owner._id)}>{video.owner.userName}</h4>
          <span>1.5 million views</span>
        </div>
        <div className={styles.subscribe}>
          <button style={{cursor:"pointer"}} onClick={handleSubscribe}>{subscribed?"Subscribed":"Subscribe"}</button>
        </div>
      </div>
    </div>

    <div className={styles.videoDescription}>
        <p>{video.description}</p>
      </div> 


    <h3 className={styles.commentHeading1}>{comments.length} comments</h3>

    <div className={styles.commentsAvatar}>
        <Avatar alt="comment" src='' sx={{width: 30,height: 30,border: "2px solid black",fontSize: 10}}/>
        <div className={styles.commentHeading}>
          <textarea value={commentContent} type="text" placeholder="Add a public comment" onChange={(e)=>setCommentContent(e.target.value)}/>
          <button onClick={handleCommentSubmit}>submit</button>
        </div>
      </div>

      <div className={styles.commentsContainer}>
        {
          comments.map((comment) => {
            return (
              <div key={comment._id} className={styles.comment}>
                <Avatar
                  alt="comment"
                  src={comment.owner.avatar}
                  sx={{ width: 25, height: 25, border: "2px solid black", fontSize: 6, marginTop: 1, marginLeft: 0.55}}
                  onClick={()=>handleChannel(comment.owner)}
                />
                <div className={styles.commentDetails}>
                  <div className={styles.nameAndDate}>
                    <p>Vishal</p>
                    <span>.{date.format(new Date(comment.createdAt), "DD/MM/YYYY")}</span>
                  </div>
                  <p id={styles.commentContent}>{comment.content}</p>
                  <div className={styles.icons}>
                    <ThumbUpOffAltIcon className={styles.icon} sx={{fontSize:20, marginLeft:3.75 ,marginRight:0.375}} onClick={()=>handleEvents("comment","like",comment._id)}/>
                    <span>10</span>
                    <ThumbDownOffAltIcon className={styles.icon} sx={{fontSize:20, marginLeft:3.75 ,marginRight:0.375}} onClick={()=>handleEvents("comment","dislike",comment._id)}/>
                    <span>90</span>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>

  </div>

  {/* video Recommendation part */}

  <div className={styles.videoRecommendation}>
        <div className="outerAllVideos">
          {
            allVideos.map((video)=>{
              return(
                <div key={video._id} className={styles.videoContainer} onClick={()=>handleClick(video._id)}>
                  <video className={styles.videoList} controls src={video.videoFile} poster={video.thumbnail} width='150px' height='100%'></video>
                <div className={styles.videoListDetails}>
                  <h4 className={styles.videoListTitle}>{video.title}</h4>
                  <h5>{video.owner.userName}</h5>
                <div className={styles.viewsAndDate}>
                  <h6 className={styles.views}>{video.views} .views</h6>
                  <h6 className={styles.views}>{date.format(new Date(video.updatedAt), 'DD/MM/YYYY')}</h6>
                </div>
                </div>
                </div>
              )
            })
          }
        </div>
  </div>
</div>
        </>
      }
    </Sidebar>
  );
}


export default Video;
