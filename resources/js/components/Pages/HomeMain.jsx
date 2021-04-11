import React from 'react'
import { myPotensial } from '../Utils/Utils'
import './Home__Main.css'
import Card from '../component/Card/Card'
import Information from '../component/Informasi Dan Berita/Information';
import Testimonial from '../component/Testimonial/Testimonial';


function HomeMain() {
    
    return (
        <div className="home__main container">
            <div className="content__top">
                <p>
                Desa Jangga adalah sebuah desa yang teletak di kecamatan Lumban Julu, kabupaten Toba. Desa ini berjarak 1km dari jalan raya  yang dikelilingi dengan hamparan  sawah dan bukit-bukit yang luas. Desa ini telah ditetapkan sebagai desa wisata pada tahun 2018 dan sudah dikunjungi oleh turis-turis Eropa dan Eco Tourisemt.
                Desa jangga mengadakan Festival tahunan yang bernama Harvest Festival (Panen Raya), kegiatan ini diadakan pada masa panen padi sekitar bulan Juni-Agustus. 
                </p>
            </div>
            <div className="potensi__box">
                <Card data={myPotensial.post} title={'POTENSI DESA'}/>
            </div>
            <div className="article__box" id="article-box">
                <Information />
            </div>
            <div className="testimonial">
                <Testimonial />
            </div>
        </div>
    )
}

export default HomeMain
