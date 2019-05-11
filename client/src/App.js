import React, { Component } from 'react';
import Routes from './routes'
import 'rsuite/dist/styles/rsuite.min.css'
import {BrowserRouter} from "react-router-dom";
import Header from './views/Header'
import SideBar from './components/SideBar'
import {Col, Row} from 'react-bootstrap'
import styled from 'styled-components'
import Container from "react-bootstrap/Container";
import {registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AppContent = styled.div`
  background: #eff0f7;
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
                        <Col style={{width: "calc(100%  - 200px)", overflow: "scroll", height: "100vh", display: 'flex', justifyContent: "center"}}>
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
