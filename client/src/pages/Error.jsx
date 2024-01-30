import React, {useState} from 'react';
import {Link, useRouteError} from "react-router-dom";
import Wrapper from '../assets/wrappers/ErrorPage.js'
import img from '../assets/images/not-found.svg'
const Error = (props) => {
    const error = useRouteError()
    console.log(error)

    if(error.status === 404) {
        return (
            <Wrapper>
                <div>
                     <img src={img}/>
        <h3>Ohh! page not found </h3>
            <p>we can't seem to find the page you are looking for</p>
            <Link to='/dashboard'>back home</Link>
                </div>
            </Wrapper>
        )

        return (
            <Wrapper>
                <div>
                    <h3>something went wrong</h3>
                </div>
            </Wrapper>
        )
    }




    //     <Wrapper>
    // {error.status === 404 ?
    //    ( <div>
    //
    //     </div>) : (<h3>Something went wrong</h3>)
    //     }
    //         </Wrapper>



};

export default Error;