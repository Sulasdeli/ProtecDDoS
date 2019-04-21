import React, { Component } from 'react';
import Routes from './routes'
import 'rsuite/dist/styles/rsuite.min.css'
import SideBarContent from "./views/SideBarContent";
import {Header, Footer, Container, Sidebar} from "rsuite";
import {BrowserRouter} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <div className="show-container">
            <BrowserRouter>
                <Container>
                    <Sidebar>
                        <SideBarContent/>
                    </Sidebar>
                    <Container>
                        <Header>Header</Header>
                        <Routes/>
                        <Footer>Footer</Footer>
                    </Container>
                </Container>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;
