import {FaUserCircle, FaCaretDown, FaAlignLeft} from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import {useMyContext} from "../context/MyContext.jsx";
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function LogoutContainer(props) {
    const [showLogout, setShowLogout] = useState(false)
    const {state, dispatch} = useMyContext()
    const {userData} = state
    const navigate = useNavigate()

    const logoutHandler = async () => {
        navigate('/')
        await customFetch.get('/auth/logout')
        toast.success('Logging out...')
    }
    return (
        <Wrapper>
            <button type='button' className='btn logout-btn' onClick={() => {
                setShowLogout(prevState => !prevState);
            }}>
                {userData.avatarPublicId ? <img src={userData.avatar} alt='avatar' className='img' /> : <FaUserCircle /> }
                {userData.lastName}
                <FaCaretDown />
            </button>
            <div className={showLogout? 'dropdown show-dropdown': 'dropdown'}>
                <button type='button' className='dropdown-btn' onClick={logoutHandler}>
                    logout
                </button>
            </div>

        </Wrapper>
    );
}

export default LogoutContainer;