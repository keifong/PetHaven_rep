import '../App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

function CatCard({ catName, catBreed, catAge, onChangePage }) {

    const [catImage, setCatImage] = useState('');

    useEffect(() => {
        const getCatImage = async () => {
            try {
                const response = await axios.get(`https://api.thecatapi.com/v1/images/search`);
                setCatImage(response.data[0].url);
            } catch (error) {
                alert(error);
            }
        };
        getCatImage();

    }, [catBreed]);

    const isLogin = localStorage.getItem('isLoggedIn');
    const adoptionForm = () => {
        if (isLogin) {
            onChangePage(4, { petName: catName, petBreed: catBreed });
        } else {
            alert('Log in first');
            onChangePage(5);
        }
        
    }

    return (
        <div className='card_div'>
            <img src={catImage} />
            <p id='dogName'>Name: {catName}</p>
            <p id='dogBreed'>Breed: {catBreed ? catBreed.charAt(0).toUpperCase() + catBreed.slice(1) : "Unknown"}</p>
            <p id='dogAge'>Age: {catAge}</p>
            <button className='btn' onClick={adoptionForm}>Adopt</button>
        </div>
    );
}

export default CatCard;
