import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ExplorePage from "../components/ExplorePage";
import ServiceDetails from "../components/ServiceDetails";

export default () => (
        <Switch>
            <Route path="/" exact render={() => <Redirect to='/explore'/>}/>
            <Route path="/explore" exact render={props => <ExplorePage {...props}/>}/>
            <Route path="/explore/:id" exact render={props => <ServiceDetails {...props}/>}/>
            <Redirect from='/*' to='/explore'/>
        </Switch>
)