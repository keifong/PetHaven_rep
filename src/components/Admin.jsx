import { useState, useEffect } from 'react';
import '../App.css';
import logo from '../assets/petHaven_logo_rmbg.png';

function Admin({ onChangePage }) {
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [releaseRequests, setReleaseRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('adoptions'); // 'adoptions' or 'releases'

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = () => {
        const pendingAdoptions = JSON.parse(localStorage.getItem('pendingForms')) || [];
        const pendingReleases = JSON.parse(localStorage.getItem('pendingReleases')) || [];
        setAdoptionRequests(pendingAdoptions);
        setReleaseRequests(pendingReleases);
    };

    const approveAdoption = (request) => {
        // Save approvedForm for customer
        localStorage.setItem('approvedForm', JSON.stringify(request));

        // Remove from pendingForms
        const remaining = adoptionRequests.filter(f => f.username !== request.username);
        localStorage.setItem('pendingForms', JSON.stringify(remaining));
        setAdoptionRequests(remaining);

        alert("Adoption Request Approved!");
    };

    const approveRelease = (request) => {
        // Remove the pet from customer's account
        localStorage.removeItem('approvedForm');

        // Remove from pendingReleases
        const remaining = releaseRequests.filter(r => r.username !== request.username);
        localStorage.setItem('pendingReleases', JSON.stringify(remaining));
        setReleaseRequests(remaining);

        alert("Release Request Approved!");
    };

    const redirect = () => onChangePage(5);

    return (
        <div id="admin_div">
            <div className='admin_row' id='adminHeader'>
                <img src={logo} alt="Logo" />
                <div className='admin_row' id='headerDeets'>
                    <h1>Admin Page</h1>
                    <button className='btn2' onClick={redirect}>Logout</button>
                </div>
            </div>

            <div className='admin_col'>
                {/* Tab Navigation */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button 
                        id='adoptReq_btn' 
                        className={activeTab === 'adoptions' ? 'btn' : 'btn2'}
                        onClick={() => setActiveTab('adoptions')}
                    >
                        Adoption Requests ({adoptionRequests.length})
                    </button>
                    <button 
                        id='relReq_btn' 
                        className={activeTab === 'releases' ? 'btn' : 'btn2'}
                        onClick={() => setActiveTab('releases')}
                    >
                        Release Requests ({releaseRequests.length})
                    </button>
                </div>

                {/* Adoption Requests */}
                {activeTab === 'adoptions' && (
                    <>
                        <h1>Adoption Requests</h1>
                        <div className='admin_row' id='details'>
                            {adoptionRequests.length > 0 ? (
                                adoptionRequests.map((request, index) => (
                                    <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
                                        <h3>Customer: {request.username}</h3>
                                        <p><strong>Pet:</strong> {request.petName}</p>
                                        <p><strong>Breed:</strong> {request.petBreed}</p>
                                        <p><strong>Name:</strong> {request.firstName} {request.lastName}</p>
                                        <p><strong>Email:</strong> {request.email}</p>
                                        <p><strong>Phone:</strong> {request.phoneNum}</p>
                                        <p><strong>Date:</strong> {request.date}</p>
                                        <button className='btn2' onClick={() => approveAdoption(request)}>
                                            Approve Adoption
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No pending adoption requests.</p>
                            )}
                        </div>
                    </>
                )}

                {/* Release Requests */}
                {activeTab === 'releases' && (
                    <>
                        <h1>Release Requests</h1>
                        <div className='admin_row' id='details'>
                            {releaseRequests.length > 0 ? (
                                releaseRequests.map((request, index) => (
                                    <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
                                        <h3>Customer: {request.username}</h3>
                                        <p><strong>Pet Name:</strong> {request.petName}</p>
                                        <p><strong>Breed:</strong> {request.petBreed}</p>
                                        <p><strong>Reason:</strong> {request.reason}</p>
                                        <p><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>
                                        <button className='btn2' onClick={() => approveRelease(request)}>
                                            Approve Release
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No pending release requests.</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Admin;