import { useState, useEffect } from 'react';
import '../App.css';

import AboutUs from './AboutUs';
import HomePetCard from './HomePetCard';
import CatCard from './CatCard';

function Pets({onChangePage}) {
    const [visibility, setVisibility] = useState(false);

    // setting page to start fully scrolled up
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dogs = [
        {dogName:"Luna", dogBreed:"pembroke", dogAge:"2", dogIndex: 4},
        {dogName:"Bella", dogBreed:"pembroke", dogAge:"1", dogIndex: 6},
        {dogName:"Charlie", dogBreed:"puggle", dogAge:"1", dogIndex: 9},
        {dogName:"Milo", dogBreed:"terrier", dogAge:"4", dogIndex: 12},
        {dogName:"Daisy", dogBreed:"chow", dogAge:"5", dogIndex: 2},
        {dogName:"Cooper", dogBreed:"chow", dogAge:"4", dogIndex: 3},
        {dogName:"Navy", dogBreed:"pug", dogAge:"3", dogIndex: 4},
    ]

    // add cats as well
    const cats = [
        {catName:"Willow", catBreed:"Maine Coon", catAge:"2"},
        {catName:"Luna", catBreed:"Siamese", catAge:"1"},
        {catName:"Oliver", catBreed:"British Shorthair", catAge:"1"},
        {catName:"Koda", catBreed:"Bengal", catAge:"4"},
        {catName:"Nippy", catBreed:"Regdoll", catAge:"5"},
        {catName:"Meowy", catBreed:"Scottish Fold", catAge:"4"},
        {catName:"Nala", catBreed:"Sphynx", catAge:"3"},
    ]

    const buttonFunction = () => {
        setVisibility(true)
    }
    

    return (
       <div id='petsDiv'>
            <div id='pets_about'>
                <AboutUs index={1}></AboutUs>
                <button 
                    className='btn' 
                    onClick={buttonFunction} 
                    style={{display: visibility? 'none': 'flex'}}>
                    Next
                </button>
            </div>
            
            <div id='grid_div' style={{
                display: visibility? 'grid' : 'none', }}>
                 {dogs.map((dog, index) => (
                    <HomePetCard
                        key={index}
                        dogName={dog.dogName}
                        dogBreed={dog.dogBreed}
                        dogAge={dog.dogAge}
                        dogIndex={dog.dogIndex}
                        onChangePage={onChangePage}
                    />
                ))}
                {cats.map((cat, index) => (
                    <CatCard
                        key={index}
                        catName={cat.catName}
                        catBreed={cat.catBreed}
                        catAge={cat.catAge}
                        onChangePage={onChangePage}
                    />
                ))}
            </div>
       </div>
    );
}

export default Pets;