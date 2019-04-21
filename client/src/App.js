import React, { Component } from 'react';
import Routes from './routes'
import 'rsuite/dist/styles/rsuite.min.css'
import {Container} from "rsuite";
import {BrowserRouter} from "react-router-dom";
import Header from './views/Header'
import SideBar from './components/SideBar'
import {Col, Row} from 'react-bootstrap'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <Container>
                <Header/>
                <Row style={{display: 'flex'}}>
                    <Col>
                        <SideBar/>
                    </Col>
                    <Col md="auto">
                        <Routes/>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>
    );
  }
}

export default App;
