import React from 'react';
import Wrapper from "../assets/wrappers/landingPage.js";
import main from '../assets/images/main.svg'
import {Link} from "react-router-dom";
import {Logo} from '../components/index.js'

const Landing = (props) => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1> Job <span>tracking</span> app</h1>
                    <p>I'm baby sus tousled lo-fi forage quinoa. Meh humblebrag cray roof party kogi next level cornhole retro. Vaporware single-origin coffee gentrify, vinyl fanny pack succulents fit street art bushwick lumbersexual deep v vexillologist. Knausgaard helvetica selfies, green juice literally woke sustainable 8-bit pork belly gochujang flexitarian yr.</p>
                     <Link to='/register' className='btn register-link'>Register</Link>
                <Link to='/login' className='btn login-link'>Login / Demo User</Link>
                </div>
                <img src={main} className='img main-img' alt='job hunt'/>
            </div>
        </Wrapper>
            )

};

export default Landing;