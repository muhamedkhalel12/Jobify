import React, {useContext} from 'react';
import Wrapper from '../assets/wrappers/BigSidebar.js'
import NavLinks from "./NavLinks.jsx";
import Logo from './Logo.jsx';
import {useMyContext} from "../context/MyContext.jsx";

function BigSidebar() {
    const {state, dispatch} = useMyContext()

    return (
        <Wrapper>
            <h1>{state.sidebar}</h1>
            <div className={state.sidebar? 'sidebar-container' : 'sidebar-container show-sidebar'}>

            <div className="content">
                <header>
                    <Logo />
                </header>
                <NavLinks />
            </div>
                </div>
        </Wrapper>
    );
}

export default BigSidebar;