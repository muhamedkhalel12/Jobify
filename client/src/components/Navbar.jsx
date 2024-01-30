import React, {useContext} from 'react';
import Wrapper from '../assets/wrappers/Navbar.js'
import { FaAlignLeft } from 'react-icons/fa'
import { Logo } from '../components/index.js'
import LogoutContainer from "./LogoutContainer.jsx";
import {useMyContext} from "../context/MyContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

function Navbar() {
    const {state, dispatch} = useMyContext()
    return (
        <Wrapper>
            <div className="nav-center">
                <button type='button' className='toggle-btn' onClick={() => {
                    dispatch({type: 'toggleSidebar'})
                }}>
                    <FaAlignLeft />
                </button>
            <div>
                <Logo />
                    <h4 className='logo-text'>dashboard</h4>
            </div>
        <div className="btn-container">
            <ThemeToggle />
            <LogoutContainer />
        </div>
            </div>

        </Wrapper>
    );
}

export default Navbar;