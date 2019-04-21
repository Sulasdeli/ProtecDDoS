import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import HomePage from '../views/HomePage';
import SearchPage from "../views/SearchPage";
import UploadPage from "../views/UploadPage";

export default () => (
        <Switch>
            <Route path="/" exact render={() => <Redirect to='/home'/>}/>
            <Route path="/home" render={props => <HomePage {...props} />}/>
            <Route path="/search" render={props => <SearchPage {...props} />}/>
            <Route path="/upload" render={props => <UploadPage {...props} />}/>
            <Redirect from='/*' to='/home' />
        </Switch>
)