import React from 'react'
import {Route} from 'react-router-dom'

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Expenses from './pages/Expenses';


const BaseRouter=()=>(

    <div>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/expenses' component={Expenses}/>
    </div>

)

export default BaseRouter