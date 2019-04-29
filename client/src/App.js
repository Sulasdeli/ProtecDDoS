import React, { Component } from 'react';
import Routes from './routes'
import 'rsuite/dist/styles/rsuite.min.css'
import {BrowserRouter} from "react-router-dom";
import Header from './views/Header'
import SideBar from './components/SideBar'
import {Col, Row} from 'react-bootstrap'
import styled from 'styled-components'
import Container from "react-bootstrap/Container";

const AppContent = styled.div`
  background: #eff0f7;
  height: 100%;
  width: 100%;
`;

class App extends Component {
  render() {
    return (
        <AppContent>
            <BrowserRouter>
                <Container>
                    <Header/>
                    <Row style={{display: 'flex'}}>
                        <Col>
                            <SideBar/>
                        </Col>
                        <Col style={{width: "calc(100%  - 200px)"}}>
                            <Routes/>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        </AppContent>
    );
  }
}

export default App;
