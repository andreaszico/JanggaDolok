import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './slider-animations.css';
import './carousel.css';
import { Link } from 'react-router-dom';

function Carousel() {
    const content = [
        {
            title: 'DESA JANGGA DOLOK',
            description:
                'Desa yang sangat indah dan kental dengan budaya adat batak toba. Desa ini diapit oleh pemandangan bukit-bukit dan sawah yang membuat desa ini sangat sejuk.',
            button: 'Selengkapnya',
            link: '/about-us',
            image: 'https://i.postimg.cc/JzLsCy1R/2.jpg',
            user: 'Luan Gjokaj',
            userProfile: 'https://i.postimg.cc/65PP1nqz/JSW6mEk.jpg'
        },
        {
            title: 'DESA JANGGA DOLOK',
            description:
                'Desa yang sangat indah dan kental dengan budaya adat batak toba. Desa ini diapit oleh pemandangan bukit-bukit dan sawah yang membuat desa ini sangat sejuk.',
            button: 'Discover',
            link: '/article',
            image: 'https://i.postimg.cc/g28kmZQ7/15.jpg',
            user: 'Erich Behrens',
            userProfile: 'https://i.postimg.cc/65PP1nqz/JSW6mEk.jpg'
        },
        {
            title: 'DESA JANGGA DOLOK',
            description:
                'Desa yang sangat indah dan kental dengan budaya adat batak toba. Desa ini diapit oleh pemandangan bukit-bukit dan sawah yang membuat desa ini sangat sejuk.',
            button: 'Hubungi Kami',
            link: '/contact-us',
            image: 'https://i.postimg.cc/MGK6DVYr/coba.jpg',
            user: 'Bruno Vizovskyy',
            userProfile: 'https://i.postimg.cc/65PP1nqz/JSW6mEk.png'
        }
    ];
    return (
        <Slider className="slider-wrapper" autoplay={1500} >
            {content.map((item, index) => (
                <div
                    key={index}
                    className="slider-content"
                    style={{ background: `url('${item.image}') no-repeat center center` }}
                >
                    <div className="inner">
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        <Link to={item.link}>
                            <button>{item.button}</button>
                        </Link>
                    </div>
                    {/* <section>
                        <img src={item.userProfile} alt={item.user} />
                        <span>
                            Posted by <strong>{item.user}</strong>
                        </span>
                    </section> */}
                </div>
            ))}
        </Slider>
    )
}

export default Carousel
