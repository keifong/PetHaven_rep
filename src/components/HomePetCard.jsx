import '../App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

function HomePetCard({ dogName, dogBreed, dogAge, dogIndex, onChangePage }) {

    const [dogImage, setDogImage] = useState('');

    useEffect(() => {
        const getDogImage = async () => {
            // usage of axios (try catch)
            try {
                const response = await axios.get(`https://dog.ceo/api/breed/${dogBreed.toLowerCase()}/images`);
                setDogImage(response.data.message[dogIndex]);
                // additional parameter of dogIndex so to retain the same dog image instead of random generation
            } catch (error) {
                alert(error);
            }
        };
        if (dogBreed) {
            getDogImage();
        }
    }, [dogBreed, dogIndex]);

    const isLogin = localStorage.getItem('isLoggedIn');

    // ensures the customer has logged in before he can send adoption request
    const adoptionForm = () => {
        if (isLogin) {
            onChangePage(4, { petName: dogName, petBreed: dogBreed });
        } else {
            alert('Log in first');
            onChangePage(5);
        }
    }

    return (
        <div className='card_div'>
            <img src={dogImage} />
            <p id='dogName'>Name: {dogName}</p>
            <p id='dogBreed'>Breed: {dogBreed.charAt(0).toUpperCase() + dogBreed.slice(1)}</p>
            <p id='dogAge'>Age: {dogAge}</p>
            <button className='btn' onClick={adoptionForm}>Adopt</button>
        </div>
    );
}

export default HomePetCard;
