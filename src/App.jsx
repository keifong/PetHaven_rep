import { useState } from 'react';
import './App.css';

import Home from './components/Home';
import Pets from './components/Pets';
import PetRelease from './components/PetRelease';
import Account from './components/Account';
import NavBar from './components/navBar';
import AdoptionForm from './components/AdoptionForm';
import LoginRegister from './components/loginRegister';
import Admin from './components/Admin';

function App() {
  const [page, setPage] = useState(0);
  const [petToAdopt, setPetToAdopt] = useState(null); // store selected pet

  const handleChangePage = (pageNum, petData = null) => {
    if (petData) {
      setPetToAdopt(petData); // save pet for adoption form
    }
    setPage(pageNum);
  };

  let thePage;
  switch (page) {
    case 0: thePage = <Home onChangePage={handleChangePage}/>; break;
    case 1: thePage = <Pets onChangePage={handleChangePage}/>; break;
    case 2: thePage = <PetRelease onChangePage={handleChangePage}/>; break;
    case 3: thePage = <Account onChangePage={handleChangePage}/>; break;
    case 4:
      thePage = <AdoptionForm 
        onChangePage={handleChangePage}
        petName={petToAdopt?.petName}
        petBreed={petToAdopt?.petBreed}
      />;
      break;
    case 5: thePage = <LoginRegister onChangePage={handleChangePage}/>; break;
    case 6: thePage = <Admin onChangePage={handleChangePage}/>; break;
    default: thePage = <Home onChangePage={handleChangePage}/>; break;
  }

  return (
    <div className="App">
      {page == 5 || page == 6 ? null  : <NavBar onChangePage={handleChangePage}/>}
      {thePage}
    </div>
  )
}

export default App;
