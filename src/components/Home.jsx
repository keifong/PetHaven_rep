import { useState, useEffect, useRef } from 'react';
import '../App.css';

import HomePetCard from './HomePetCard';
import Reviews from './Reviews';
import AboutUs from './AboutUs';

function Home({onChangePage}) {
    const aboutUsRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
  
    const dogs = [
        { dogName: "Rudolf", dogBreed: "retriever", dogAge: "10 Years Old", dogIndex: 4 },
        { dogName: "Melissa", dogBreed: "chihuahua", dogAge: "3 Years Old", dogIndex: 3 },
        { dogName: "Max", dogBreed: "pug", dogAge: "3 Years Old", dogIndex: 3 }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dogs.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [dogs.length]);

    const petsPage = () => {
        onChangePage(1)
    }
    
    const scrollAU = () => {
        console.log("clicked")
        aboutUsRef.current?.scrollIntoView({
            behaviour: "smooth"
        })
    }

    return (
        <div className='homeContainer' id='homeContainer'>
            <div className='section_div'>
            <div className='top_div'>
                <h1>A HOME TO FIND.</h1>
                <h2>BETTER, SAFER</h2>
                <button className='btn' onClick={scrollAU}>About Us</button>
            </div>
            
            <div className='carousel-container'>
                {dogs.map((dog, index) => (
                <div
                    key={index}
                    className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                    style={{ zIndex: index === currentIndex ? 1 : 0 }}
                >
                    <HomePetCard
                    dogName={dog.dogName}
                    dogBreed={dog.dogBreed}
                    dogAge={dog.dogAge}
                    dogIndex={dog.dogIndex}
                    onChangePage={onChangePage}
                    />
                </div>
                ))}
            </div>
            </div>
            <div className='section_div' id='reviewsSection'>
            <Reviews></Reviews>
            </div>
            {/* <div className='section_div' id='aboutUs_div'> */}
            <div id='aboutUs_div' ref={aboutUsRef}>
                <div className='section_div'>
                <AboutUs index={0}></AboutUs>
                <div id='findUs'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.655897715661!2d103.83580458546606!3d1.3831001950039132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da16bf60de43cf%3A0xfe013c42e723af12!2s621%20Ang%20Mo%20Kio%20Ave%209%2C%20Block%20621%2C%20Singapore%20560621!5e0!3m2!1sen!2ssg!4v1763768772695!5m2!1sen!2ssg" id='map' loading="lazy" ></iframe>
                </div>
                

                </div>
                <button className='btn2' onClick={petsPage}>See Our Pets</button>
            </div>
            {/* <div className='section_div' id='aboutUs_div'> */}
        </div>
      )
}

export default Home;