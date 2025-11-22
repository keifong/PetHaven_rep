

// this here tells the purpose of this Pet Haven
// this also shows the Good reviews and the good works Pet Haven has done (Straits time news, Mothership News)

import { useState } from "react";

function Reviews() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const reviews = [
         // Customer testimonials
        {
            title: "Exceptional Service", elaboration: "Pet Haven and its employees do such a meaningful role in caring for pet's welfare and care. From the little time I spent with them, I can tell that they pour their heart out for the pets they have rescued and diligently sources out new owners. I myself being a fortunate final-home for a cute Labradoodle. Thank you Pet Haven! ", source: "Lara Carson, Pet Owner",
            date: "2025-11-23"
        },
       
        {
            title: "Life-Changing Experience", 
            elaboration: "I was hesitant about adopting at first, but Pet Haven made the entire process so smooth and reassuring. The staff took time to understand my lifestyle and matched me with the perfect companion - a gentle Golden Retriever named Buddy. Six months later, I can't imagine life without him. Pet Haven doesn't just find homes for pets; they create families.", 
            source: "Marcus Tan, Software Engineer",
            date: "2019-06-21"
        },

        {
            title: "Compassionate and Professional", 
            elaboration: "After losing my previous dog, I wasn't sure I was ready to open my heart again. The team at Pet Haven was incredibly understanding and patient with me. They introduced me to a senior Beagle who needed a quiet home, and it was love at first sight. Their post-adoption support has been wonderful too. Highly recommend to anyone looking to adopt!", 
            source: "Sarah Lim, Teacher",
            date:  "2024-01-11"
        },

        // News channel features
        {
            title: "Local Shelter Sets Gold Standard in Animal Welfare", 
            elaboration: "Pet Haven has emerged as a model organization in Singapore's animal welfare landscape. With a 95% successful adoption rate and comprehensive post-adoption support programs, the shelter has rehomed over 500 animals in the past year alone. Their rigorous vetting process ensures lasting matches between pets and families, significantly reducing return rates.", 
            source: "The Straits Times",
            date:  "2023-07-15"
        },

        {
            title: "How Pet Haven is Changing Lives, One Paw at a Time", 
            elaboration: "This Yishun-based animal shelter is making waves for all the right reasons. Pet Haven's innovative approach combines modern facilities with personalized matchmaking services that go beyond traditional adoption centers. Their recent partnership with local veterinary clinics has also made pet ownership more accessible for lower-income families, proving that compassion and sustainability can go hand-in-hand.", 
            source: "Mothership Singapore",
            date:  "2025-12-11"
        }
    ]

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex + 1) % reviews.length
        );
    };

    return(
        <div id="rv_div">
            <h2>Our Reviews</h2>
            <div id="review_div">
                <div id="revTitle">
                    <h3>{reviews[currentIndex].title}</h3>
                    <img id='stars5_img' src="src\assets\stars5_rmbg.png"/>
                </div>
                
                <p>{reviews[currentIndex].elaboration}</p>
                <div className="putRow2">
                    <p>{reviews[currentIndex].source}</p>
                    <p>{reviews[currentIndex].date}</p>
                </div>
            </div>
            <div className="putRow">
                <button onClick={handleNext} className="btn2">Next →</button>
                <h3>{currentIndex+1}/{reviews.length}</h3>
            </div>
        </div>
    );
}

export default Reviews;
