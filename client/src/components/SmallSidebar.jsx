import React, {useContext} from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar.js'
import {FaTimes} from "react-icons/fa";
import {Logo} from '../components/index.js'
import links from "../utils/links.jsx";
import {NavLink} from "react-router-dom";
import NavLinks from "./NavLinks.jsx";
import {useMyContext} from "../context/MyContext.jsx";

function SmallSidebar() {
    const {state, dispatch} = useMyContext()

    return (
        <Wrapper>
            <div className={state.sidebar ? 'sideBar-container show-sidebar' : 'sideBar-container'}>
                <div className="content">
                    <button type='button' className='close-btn' onClick={() => {
                        dispatch({type: 'toggleSidebar'})
                    }}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                   <NavLinks />
                </div>
            </div>
        </Wrapper>
    );
}

export default SmallSidebar;