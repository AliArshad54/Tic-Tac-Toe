import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Signup from '../Registration/Signup';
import Game from '../Components/Game';
// import Login from '../Registration/login';
const Routing = () => {
  return (
   <>
    <Routes>
      {/* <Route exact path='/' Component={Login}/> */}
        <Route exact path='/' Component={Signup}/>
        <Route exact path='/game' Component={Game}/>
    </Routes>
   </>
  )
}

export default Routing