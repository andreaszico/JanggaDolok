import React from 'react'
import Carousel from '../component/Carousel/Carousel'
import Footer from '../component/Footer/Footer'
import Maps from '../component/Maps/Maps'
import './Home.css'
import HomeMain from './HomeMain'

let state_of_state = localStorage["users"];
if (!state_of_state) {
    let appState = {
        isLoggedIn: false,
        user: {}
    };
    localStorage["users"] = JSON.stringify(appState);
}


function Home() {
    return (
        <div className="container-fluid p-0">
            <Carousel />
            <HomeMain />
            <div className="map-box">
                <Maps />
            </div>
            <Footer />
        </div>
    )
}

export default Home;


