import React, { useEffect, useState,useRef } from "react";
import Sidebar from "../Sidebar";
import Box from "@mui/material/Box";
import styles from "./Dashboard.module.css";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import date from "date-and-time";

function Dashboard() {
  
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [distance, setDistance] = useState(0);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      setIsLoading(true); 
      console.log("page ", page);
      const res = await axios.get("http://localhost:8000/api/v1/video", {
        withCredentials: true,
        mode: "cors",
        headers: {},
        params: {
          page: page,
        },
      });
      console.log("res ", res);
      // setVideos(res.data.data.docs);
      setVideos((prev) => [...prev, ...res.data.data.docs]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleClick = (e) => {
    navigate(`/video/${e}`);
  };

  const handleAddMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <Sidebar>
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

      <div onClick={handleAddMore}>Add More Videos</div>

      {isLoading && <p>Loading...</p>}
    </Sidebar>
  );
}

export default Dashboard;
