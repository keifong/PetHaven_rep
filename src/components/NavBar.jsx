import '../App.css'
import logo from '../assets/petHaven_logo_rmbg.png'


function NavBar({onChangePage}) {
    
    return (
        <div className="nav_div">
            <div id='logo_div'>
                 <img src={logo} onClick={() => onChangePage(0)}/>
            </div>
            <div id='navBut_div'>
                 <p  className="navBut" onClick={() => onChangePage(1)}>Our Pets</p>
                <p className="navBut" onClick={() => onChangePage(2)}>Pet Release</p>
                <p className="navBut" onClick={() => onChangePage(3)}>Your Account</p>
            </div>
        </div>
    );
}
export default NavBar;
