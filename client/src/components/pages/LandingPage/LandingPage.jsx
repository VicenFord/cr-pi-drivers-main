import React from 'react'
import './landingPage.css'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div id='landingPage'>

        <div id="containerLandingPage">
            <img id='F1logo' src='../../../../assets/images/F1-logo.png'></img>
            <div>
                <Link to='/home'>
                    <button id='buttonLanding'>Check it out!</button>
                </Link>
                <p>Drivers - By <a href='https://github.com/VicenFord' target='_blank'>Vicente Ford</a></p>
            </div>

        </div>

        <video autoPlay loop muted playsInline id='bgVideo'>
            <source id='srcVideo' src='../../../../assets/videos/bgVideo.mp4' type='video/mp4' />
        </video>
    </div>
  )
}

export default LandingPage