import React from 'react';
import { myTestimonial } from '../../Utils/Utils';
import Slider from 'react-animated-slider';
import './SliderTestimonial.css';


function SliderTestimonial() {
    return (
        <Slider  style={{ height: '100px' }}  autoplay={1500} nextButton={''}>
            {
                myTestimonial && myTestimonial.map((item, index) => (
                    <div className="slide-content-testimonial" key={index}>
                        <p>{item.description}</p>
                        <span className="user-testimonial">
                            <img src={item.userProfile} alt=""/>
                            <span>
                                <strong>{item.user}</strong>
                                user
                            </span>
                        </span>
                    </div>
                ))
            }
        </Slider>
    )
}

export default SliderTestimonial
