import React, { Component } from 'react';
import {Sidenav, Nav, Dropdown, Icon} from "rsuite";
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.div`
    padding: 18px;
    font-size: 16px;
    height: 56px;
    background: #34c3ff;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
`;

class SideBarContent extends Component {
    constructor() {
        super();
        this.state = {
            expanded: true,
            activeKey: '1'
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleToggle() {
        this.setState({
            expanded: !this.state.expanded
        });
    }
    handleSelect(eventKey) {
        this.setState({
            activeKey: eventKey
        });
    }

    render() {
        const { expanded } = this.state;

        return (
            <div style={{ width: 250 }}>
                <Header>
                    <span style={{ fontSize:20 }}> DDoS Protection Advisor</span>
                </Header>
                    <Sidenav
                        expanded={expanded}
                        defaultOpenKeys={['3', '4']}
                        activeKey={this.state.activeKey}
                        onSelect={this.handleSelect}
                    >
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item eventKey="1" componentClass={Link} to='/search' icon={<Icon icon="search" />}>
                                    Search
                                </Nav.Item>
                                <Dropdown
                                    placement="rightTop"
                                    eventKey="2"
                                    title="Ratings"
                                    icon={<Icon icon="star-o"/>}
                                >
                                    <Dropdown.Item eventKey="2-1" componentClass={Link} to='/upload' icon={<Icon icon="file-upload"/>}>Upload Attack Log File</Dropdown.Item>
                                </Dropdown>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
            </div>
        );
    }

}

export default SideBarContent;
