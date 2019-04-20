import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from '../views/Home';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" render={props => <Home {...props} />}/>
        </Switch>
    </BrowserRouter>
)