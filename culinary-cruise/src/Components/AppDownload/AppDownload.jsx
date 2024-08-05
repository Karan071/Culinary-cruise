import React from 'react'
import './AppDownload.css'
import {assets} from "../../assets/assets"


const AppDownload = () => {
  return (
    <div className='app-download' id="app-download">
        <p>For an enhanced experience, download <br /> Culinary Cruise App.</p>
        <di className="app-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </di>
    </div>
  )
}

export default AppDownload