import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Calculation from "./components/Calculation";
import library from "./library";

function App() {
    const [menuShouldOpen, setMenuShouldOpen] = useState(false);
    const openMenu = () => {
        setMenuShouldOpen(!menuShouldOpen);
    }
    const putLibrary = () => {
        localStorage.setItem('library', JSON.stringify(library));
    }
    //putLibrary();
  return (
    <div className="app">
        <header className='app-header'>
            <div className='menu'>
                <div onClick={openMenu} className={'menu-button' + (menuShouldOpen? ' open' : '')}>
                    <span></span><span></span><span></span>
                </div>
                <div className={'menu-area' + (menuShouldOpen? ' open' : '')}>
                    <ul></ul>
                </div>
            </div>
            <h1 className='app-name'>BillShare</h1>
        </header>
        <main className={'app-content' + (menuShouldOpen? ' menu_open' : '')}>
            <Calculation />
        </main>
    </div>
  );
}

export default App;
