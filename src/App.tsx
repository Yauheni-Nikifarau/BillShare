import React, {useState} from 'react';
import './App.css';
import Calculation from "./components/Calculation";
import library from "./library.js";

function App() {
    const [menuShouldOpen, setMenuShouldOpen] = useState(false);
    const openMenu = () => {
        setMenuShouldOpen(!menuShouldOpen);
    }
    const putLibrary = () => {
        localStorage.setItem('library', JSON.stringify(library));
    }
    if (!localStorage.getItem('library')) {
        putLibrary();
        console.log('put')
    }
  return (
    <div className="app">
        <header className='app-header'>
            {/*<div className='menu'>*/}
            {/*    <div onClick={openMenu} className={'menu-button' + (menuShouldOpen? ' open' : '')}>*/}
            {/*        <span></span><span></span><span></span>*/}
            {/*    </div>*/}
            {/*    <div className={'menu-area' + (menuShouldOpen? ' open' : '')}>*/}
            {/*        <ul></ul>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <h1 className='app-name'>BillShare</h1>
        </header>
        <main className={'app-content' + (menuShouldOpen? ' menu_open' : '')}>
            <Calculation/>
            <div className='app-instruction'>
                <p>It is an App helping you having a party to share your costs between participants honestly. Follow the next steps:</p>
                <p>1. Add all party participants to Participants window</p>
                <p>2. Add the information what costs has every participant to Spending window</p>
                <p>3. Add the information about all things participants bought and what things what participants shared to Items window</p>
                <p>4. Click Calculate!</p>
                <p></p>
            </div>
        </main>

    </div>
  );
}

export default App;
