import { useState, useEffect } from 'react';
import '../App.css';
import logo from '../assets/petHaven_logo_rmbg.png';

function Admin({ onChangePage }) {
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [releaseRequests, setReleaseRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('adoptions');

    useEffect(() => {
        loadRequests();
    }, []);

    // put all the forms for approval out from localStorage into useState
    const loadRequests = () => {
        const pendingAdoptions = JSON.parse(localStorage.getItem('pendingForms')) || [];
        const pendingReleases = JSON.parse(localStorage.getItem('pendingReleases')) || [];
        setAdoptionRequests(pendingAdoptions);
        setReleaseRequests(pendingReleases);
    };

    // approve function
    const approveAdoption = (request) => {
        // approvedForm for customer
        localStorage.setItem('approvedForm', JSON.stringify(request));

        // remove request from pendingForms since it has been approved
        const remaining = adoptionRequests.filter(f => f.username !== request.username);
        localStorage.setItem('pendingForms', JSON.stringify(remaining));
        setAdoptionRequests(remaining);

        alert("Adoption Request Approved!");
    };

    // release function
    const approveRelease = (request) => {
        
        localStorage.removeItem('approvedForm');

        // remove request from pendingReleases as release has been approved
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

            <div className='admin_row'>
                {/* Tab Navigation */}
                <div>
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

                {/* display adoptions UI if user clicks AdoptionRequest tab */}
                {activeTab === 'adoptions' && (
                    <>
                        <h1>Adoption Requests</h1>
                        <div className='admin_row' id='details'>
                            {adoptionRequests.length > 0 ? (
                                adoptionRequests.map((request, index) => (
                                    <div key={index} >
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


                {/* display releases UI if user clicks ReleaseRequest tab */}
                {activeTab === 'releases' && (
                    <>
                        <h1>Release Requests</h1>
                        <div className='admin_row' id='details'>
                            {releaseRequests.length > 0 ? (
                                releaseRequests.map((request, index) => (
                                    <div key={index} >
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