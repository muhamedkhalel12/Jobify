import React from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle.js'
import {useMyContext} from "../context/MyContext.jsx";
function ThemeToggle(props) {
    const {state, dispatch} = useMyContext()

    const toggleDarkTheme = () => {
        dispatch({type: 'toggleDarktheme'})
        localStorage.setItem('darkTheme', state.darkTheme)

        document.body.classList.toggle('dark-theme', state.darkTheme)
        console.log('toggling Done ')
    }
    return (
        <Wrapper onClick={toggleDarkTheme}>

            {state.darkTheme ? <BsFillMoonFill className='toggle-icon' /> : <BsFillSunFill className='toggle-icon' />}
        </Wrapper>
    );
}

export default ThemeToggle;