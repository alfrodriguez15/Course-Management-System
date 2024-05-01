import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import homepageImage1 from '../images/vt.jpg';
import homepageImage2 from '../images/course_search.PNG';
import homepageImage3 from '../images/schedule.PNG';
import homepageImage4 from '../images/analytics.jpg';
import icon1 from '../images/stud-icon.png';
import icon2 from '../images/prof-icon.png';
import icon3 from '../images/admin-icon.png';

function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false
    };

    return (
        <>
            <Navbar />
            <div className='home'>
                <Slider {...settings}>
                    <div>
                        <img src={homepageImage1} alt='Homepage 1' className='homepage-image' />
                    </div>
                    <div>
                        <img src={homepageImage2} alt='Homepage 2' className='homepage-image' />
                    </div>
                    <div>
                        <img src={homepageImage3} alt='Homepage 3' className='homepage-image' />
                    </div>
                    <div>
                        <img src={homepageImage4} alt='Homepage 4' className='homepage-image' />
                    </div>
                </Slider>
                <div className='text-container'>
                    <h1 className='title'>Virginia Tech Course Management System</h1>
                    <p className='title-2'>Manage your courses and schedules with ease.</p>
                </div>

                <div className='offer-section'>
                    <h2>What We Offer</h2>
                </div>

                <div className='icon-img-container'>
                    <div className='icon-img'>
                        <img src={icon1} alt='Icon' className='icon' />
                    </div>
                    <div className='icon-img'>
                        <img src={icon2} alt='Icon' className='icon' />
                    </div>
                    <div className='icon-img'>
                        <img src={icon3} alt='Icon' className='icon' />
                    </div>
                </div>

                <div className='icon-texts-section'>
                    <div className='icon-text'>
                        <p>Manage</p>
                        <p>Manage your past, current, and future schedules as a student.</p>
                    </div>
                    <div className='icon-text'>
                        <p>Research</p>
                        <p>Easily research your courses and make informed decisions.</p>
                    </div>
                    <div className='icon-text'>
                        <p>Create</p>
                        <p>Effortlessly create and save schedules.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;