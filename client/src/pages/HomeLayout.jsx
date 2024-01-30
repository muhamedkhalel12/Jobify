import React from 'react';
import {Outlet} from "react-router-dom";
import {MyContextProvider} from "../context/MyContext.jsx";

const HomeLayout = () => {
    const darkTheme = JSON.parse(localStorage.getItem('darkTheme')) || false;
    if(darkTheme !== document.body.classList.contains('dark-theme')) {
        document.body.classList.toggle('dark-theme', darkTheme)
    }
    return (
        <>
            <MyContextProvider>
            <Outlet />
            </MyContextProvider>

        </>

    )

};

export default HomeLayout;