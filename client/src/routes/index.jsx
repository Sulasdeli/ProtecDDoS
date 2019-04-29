import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ExplorePage from "../components/ExplorePage";
import UploadPage from "../components/UploadPage";

export default () => (
        <Switch>
            <Route path="/" exact render={() => <Redirect to='/explore'/>}/>
            <Route path="/explore" render={props => <ExplorePage {...props} />}/>
            <Route path="/upload" render={props => <UploadPage {...props} />}/>
            <Redirect from='/*' to='/explore' />
        </Switch>
)