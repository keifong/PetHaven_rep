import { useState, useEffect } from 'react';
import '../App.css';
import profile from '../assets/profile.png';

function Account({ onChangePage }) {
    const [petToAdopt, setPetToAdopt] = useState(null);
    const [info, setInfo] = useState({ 
        username: '', 
        password: '' 
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        const username = localStorage.getItem('username') || '';
        const password = localStorage.getItem('password') || '';
        setInfo({ username, password });

        const approvedForm = localStorage.getItem('approvedForm');
        if (approvedForm) setPetToAdopt(JSON.parse(approvedForm));
    }, []);

    const petName = petToAdopt?.petName || "";
    const petBreed = petToAdopt?.petBreed
        ? petToAdopt.petBreed.charAt(0).toUpperCase() + petToAdopt.petBreed.slice(1)
        : "";

    const isLogin = localStorage.getItem('isLoggedIn');
    const redirectLogin = () => {
        if (isLogin) {
            localStorage.setItem('isLoggedIn', false);
        } 
        onChangePage(5);
    };

    const loginBtnTitle = isLogin ? 'Logout' : 'Login';

    return (
        <div id='accountDiv'>
            <div id='profileTop'>
                <img id='profile' src={profile} />
                <button className='btn2' onClick={redirectLogin}>{loginBtnTitle}</button>
            </div>

            <h3>Profile</h3><hr /><br />
            <div id='profileDeets'>
                <div className='inputDiv_row'>
                    <div className='inputDiv'>
                        <label>Username:</label>
                        <input id='user_name' value={info.username} readOnly />
                    </div>
                    <div className='inputDiv'>
                        <label>Password:</label>
                        <input id='first_name' value={info.password} readOnly />
                    </div>
                </div>
            </div>

            <h3>My Pet</h3><hr /><br />
            <div id='petsOwned_div'>
                <h3 id='pName'>{petName}</h3>
                <p id='pBreed'>{petBreed}</p>
            </div>
        </div>
    );
}

export default Account;
