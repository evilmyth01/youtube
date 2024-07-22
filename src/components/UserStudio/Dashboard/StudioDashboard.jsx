import React from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import styles from '../UserStudio.module.css'

function StudioDashboard() {
  return (
    <div className={styles.main}>
            <h1>Channel Dashboard</h1>
            <div className={styles.container}>
                <div className={styles.first}>
                    <p>Want to see metrics on your recent video? <br />
                    Upload and publish a video to get started.</p>
                    <div className={styles.icon}>
                    <UploadIcon sx={{fontSize:'50px'}}/>
                    </div>
                    <span style={{fontSize:'30px'}}>Upload Video</span>
                </div>
                <div className={styles.second}>
                    <h4>Channel Analytics</h4>
                    <p>Current Subscribers:</p>
                    <p>Value</p>

                    <hr />
                    <h4>Summary</h4>
                    <p id={styles.hello1}>Total Views: <span>value</span></p>
                    <p>Total Subscribers: <span id={styles.hello}>value</span> </p>


                </div>
            </div>
        </div>
  )
}

export default StudioDashboard