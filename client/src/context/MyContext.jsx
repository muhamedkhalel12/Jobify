// MyContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Define your initial state and reducer function
const initialState = {
    sidebar: false,
    darkTheme: false,
    userData: {},

};
const MyContext = createContext();

const myReducer = (state, action) => {
  switch (action.type) {
      case 'userData' :
          return {...state, userData: action.userData}
      case 'toggleSidebar' :
          return {...state, sidebar: !state.sidebar}
      case 'toggleDarktheme':
          return {...state, darkTheme: !state.darkTheme}
    default:
      return state;
  }
};

const MyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(myReducer, initialState);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

export { MyContextProvider, useMyContext };
