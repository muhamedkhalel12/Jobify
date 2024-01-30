import React, {useContext} from 'react';
import links from "../utils/links.jsx";
import {NavLink} from "react-router-dom";
import {useMyContext} from "../context/MyContext.jsx";

function NavLinks() {
    const {state, dispatch} = useMyContext()
    return (
         <div className="nav-links">
                        {links.map((link) => {
                            const {text, path, icon} = link
                          return  <NavLink to={path} key={text} className='nav-link' onClick={() => {
                              dispatch({type: 'toggleSidebar'})
                          }} end>
                              <span className='icon'>
                                  {icon}
                              </span>
                              {text}
                          </NavLink>
                        })}
                    </div>
    );
}

export default NavLinks;