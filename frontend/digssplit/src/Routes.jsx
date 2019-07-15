import React from 'react'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Expenses from './pages/Expenses';



const BaseRouter=(props)=>{

    
return(
    <div>
        <Switch>
            <Route exact path='/' render={props => (<Home {...props} drawer={props.drawer} toggleDrawer={props.toggleDrawer} />)} />
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/expenses' component={Expenses}/>
            {console.log(props.toggleDrawer)}
        </Switch>
    </div>
)
}

export default BaseRouter