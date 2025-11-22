import { useState, useEffect } from 'react';
import '../App.css';

function AdoptionForm({ onChangePage, petName, petBreed }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [adopForm_content, setAdopForm_content] = useState({
        petName: petName || "",
        petBreed: petBreed || "",
        firstName: '',
        lastName: '',
        email: '',
        phoneNum: '',
        date: '',
        tnc: false
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setAdopForm_content(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = [];
        if (!adopForm_content.firstName) errors.push("Fill in First Name");
        if (!adopForm_content.email) errors.push("Fill in Email");
        if (!adopForm_content.phoneNum) errors.push("Fill in Phone Number");
        if (!adopForm_content.date) errors.push("Fill in the Date");
        if (!adopForm_content.tnc) errors.push("Agree to Terms & Conditions");

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        // save to pendingForms
        const pendingForms = JSON.parse(localStorage.getItem('pendingForms')) || [];
        // check if customer already has a pending request
        const username = localStorage.getItem('username');

        const hasPendingRequest = pendingForms.find(f => f.username == username);
        if (hasPendingRequest) {
            alert("You already requested to adopt another pet");
            return;
        }
        
        // check if user already has a pet, only allowed 1 pet at a time
        const approvedForm = localStorage.getItem('approvedForm')
        if (approvedForm) {
            alert("You already have a pet");
            return;
        }

        pendingForms.push({
            ...adopForm_content,
            username,
            status: 'pending'
        });
        localStorage.setItem('pendingForms', JSON.stringify(pendingForms));

        alert("Submission Successful!");
        onChangePage(0); // back to home
    };

    return (
        <div id="adoptionForm_div">
            <h1>Pet Adoption Form</h1>
            <form onSubmit={handleSubmit} id='adop_form'>
                <div className='ai_row'>
                    <div className='ai_col'>
                        <label>Name of Pet:</label>
                        <input name='petName' value={adopForm_content.petName} readOnly />
                    </div>
                </div>

                <div id='adoptInfo'>
                    <div className='ai_row'>
                        <div className='ai_col'>
                            <label>First Name:</label>
                            <input name='firstName' value={adopForm_content.firstName} onChange={handleInputChange} />
                        </div>
                        <div className='ai_col'>
                            <label>Last Name:</label>
                            <input name='lastName' value={adopForm_content.lastName} onChange={handleInputChange} />
                        </div>
                    </div>

                    <label>Email:</label>
                    <input name='email' value={adopForm_content.email} onChange={handleInputChange} />

                    <label>Phone Number:</label>
                    <input type='number' name='phoneNum' value={adopForm_content.phoneNum} onChange={handleInputChange} />

                    <label>Date:</label>
                    <input type='date' name='date' value={adopForm_content.date} onChange={handleInputChange} />

                    <div className='ai_row' id='assuranceDiv'>
                        <input id='tnc_checkbox' type='checkbox' name='tnc' checked={adopForm_content.tnc} onChange={handleInputChange} />
                        <label>I hereby understand and agree that the current owner makes no representations or warranties, expressed or implied, about the above-mentioned animal's temperament and is absolved from any liability for future damages or injuries caused by said animal. I also understand and agree that the current owner further gives no guarantees, expressed or implied, of the animal's suitability to the adopter and/or his family.</label>
                    </div>
                </div>

                <div id='adoptBtn_div'>
                    <button className='btn' type='submit'>Submit Form</button>
                </div>
            </form>
        </div>
    );
}

export default AdoptionForm;
