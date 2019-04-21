import React from 'react'
import {Route, Switch} from 'react-router-dom'
import HomePage from '../views/HomePage';
import SearchPage from "../views/SearchPage";
import UploadPage from "../views/UploadPage";

export default () => (
        <Switch>
            <Route path="/" exact render={props => <HomePage {...props} />}/>
            <Route path="/search" render={props => <SearchPage {...props} />}/>
            <Route path="/upload" render={props => <UploadPage {...props} />}/>
        </Switch>
)