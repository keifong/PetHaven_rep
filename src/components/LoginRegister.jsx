import { useState, useEffect } from 'react'
import '../App.css';
import axios from 'axios';
import logo from '../assets/petHaven_logo_rmbg.png'

function LoginRegister({ onChangePage }) {
    const [loading, setLoading] = useState(true);
    const [dogImage, setDogImage] = useState('');

    const [login_content, setLogin_content] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        const getDogImage = async () => {
            try {
                const response = await axios.get(`https://dog.ceo/api/breeds/image/random`);
                setDogImage(response.data.message);
                // giving the api some time to load before i show the page

                setTimeout(() => {
                    setLoading(false);
                }, 1000);
                
            } catch (error) {
                alert(error);
            }
        };

        getDogImage();
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogin_content(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const loginNow = (event) => {
        event.preventDefault();

        const errorArray = [];

        if (!login_content.username) errorArray.push("Type in your Username");
        if (!login_content.password) errorArray.push("Type in your password");

        if (errorArray.length > 0) {
            alert(errorArray.join('\n'));
            return;
        }

        // check if admin, if yes, just go straight
        if (login_content.username === "admin" ) {
            localStorage.setItem("isLoggedIn", true);
            onChangePage(6);  
            return;
        }

        const uName = localStorage.getItem('username');
        const pass = localStorage.getItem('password');

        if (login_content.username == uName && login_content.password == pass) {
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }
        else {
            alert("Login details are incorrect");
            return;
        }

        // directed to either customer or admin
        localStorage.setItem('isLoggedIn', true)
        // if (login_content.username == 'admin'){
        //     onChangePage(6); 
        // }
        // else {
        //     onChangePage(0); 
        // }
        // alert("Logged in successfully!");
        onChangePage(0);  
    };

    const registerNow = (event) => {
        event.preventDefault();

        const errorArray = [];

        if (!login_content.username) errorArray.push("Type in your Username");
        if (!login_content.password) errorArray.push("Type in your password");

        if (errorArray.length > 0) {
            alert(errorArray.join('\n'));
            return;
        }

        // if username is admin, dont save it into localStorage, just log into admin
        if (login_content.username!= 'admin'){
            localStorage.setItem('username', login_content.username );
            localStorage.setItem('password', login_content.password);
        }
        
        
        

        alert("Registration Complete!")
    };


    if (loading) {
        return <div id='loading'><h1>Loading...</h1></div>; // Show a temporary message
    }


    return (
        <div id='loginReg_div_col'>
            <img src={logo} id='logo_loginreg'/>
            <div id='loginReg_div'>
                <img src={dogImage} />

                <form id='loginReg_form'>
                    <h2>Login/Register</h2>

                    <div className='lg_inputDiv'>
                        <label>Username:</label>
                        <input
                            name='username'
                            value={login_content.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='lg_inputDiv'>
                        <label>Password:</label>
                        <input
                            name='password'
                            type='password'
                            value={login_content.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>


                    
                    <button id='login' className='btn2' onClick={loginNow}>Login</button>
                    <button id='register' className='btn2' onClick={registerNow}>Register</button>
                </form>
            </div>
        </div>
    );
}

export default LoginRegister;
