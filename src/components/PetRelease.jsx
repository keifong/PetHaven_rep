import { useState, useEffect } from 'react';
import '../App.css';

function PetRelease({ onChangePage }) {
    const [currentPet, setCurrentPet] = useState(null);
    const [releaseReason, setReleaseReason] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Get the customer's current pet
        const approvedForm = localStorage.getItem('approvedForm');
        if (approvedForm) {
            setCurrentPet(JSON.parse(approvedForm));
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // input validation
        if (!currentPet) {
            alert("You don't have a pet to release.");
            return;
        }

        if (!releaseReason) {
            alert("Please provide a reason for releasing the pet.");
            return;
        }

        const username = localStorage.getItem('username');
        
        // Check if there's already a pending release request
        const pendingReleases = JSON.parse(localStorage.getItem('pendingReleases')) || [];
        const exists = pendingReleases.find(r => r.username === username);
        
        if (exists) {
            alert("You already have a pending release request.");
            return;
        }

        // Add to pending releases
        pendingReleases.push({
            username,
            petName: currentPet.petName,
            petBreed: currentPet.petBreed,
            reason: releaseReason,
            status: 'pending',
            requestDate: new Date().toISOString()
        });
        
        localStorage.setItem('pendingReleases', JSON.stringify(pendingReleases));
        
        alert("Submission has been successful");
        onChangePage(0); // Navigate to home
    };

    const backHome = () => {
        onChangePage(0);
    }

    if (!currentPet) {
        return (
            <div id="petRelease_div">
                <h1>Pet Release Request</h1>
                <p>You don't have any pet to release.</p>
                <button className='btn' onClick={backHome}>Back</button>
            </div>
        );
    }

    return (
        <div id="petRelease_div">
            <h1>Pet Release Request</h1>
            <form onSubmit={handleSubmit} id='release_form'>
                <div id='releaseInfo'>
                    <div className='ai_row'>
                        <div className='ai_col'>
                            <label>Pet Name:</label>
                            <input 
                                value={currentPet.petName} 
                                readOnly
                            />
                        </div>
                        <div className='ai_col'>
                            <label>Breed:</label>
                            <input 
                                value={currentPet.petBreed.charAt(0).toUpperCase() + currentPet.petBreed.slice(1)} 
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='ai_col' id='ta_reason'>
                        <label>Reason for Release:</label>
                        <textarea
                            name='releaseReason'
                            value={releaseReason}
                            onChange={(e) => setReleaseReason(e.target.value)}
                            placeholder="Please explain why you need to release this pet..."
                            rows="5"
                        />
                    </div>
                </div>

                <div id='releaseBtn_div'>
                    <button id='subRelBtn' className='btn' type='submit'>Submit</button>
                    {/* s */}
                </div>
            </form>
        </div>
    );
}

export default PetRelease;