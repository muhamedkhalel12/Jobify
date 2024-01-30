import React, {useContext, useEffect, useState} from 'react';
import {Outlet, redirect, useLoaderData} from "react-router-dom";
import Wrapper from '../assets/wrappers/Dashboard'
import {BigSidebar, SmallSidebar, Navbar} from "../components/index.js";
import {useMyContext} from "../context/MyContext.jsx";
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";


export const loader = async () => {
    try{
       const res =  await customFetch.get('/users/current-user')
        return res.data.user
    } catch (err) {
        toast.warn('Login First')
        return redirect('/')
    }
}

const DashboardLayout =  (props) => {
    const {state, dispatch} = useMyContext()
    const userData = useLoaderData()

    useEffect(() => {
        dispatch({type: "userData", userData})
    }, [userData]);


    return (
        <Wrapper>
            <main className="dashboard">
                {state.sidebar && <SmallSidebar />
                }                <BigSidebar />
                <div>
                    <Navbar/>
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    )
        };


export default DashboardLayout;