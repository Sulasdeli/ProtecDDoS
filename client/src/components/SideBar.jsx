import React, { Component } from 'react';
import {Sidenav, Nav, Dropdown, Icon} from "rsuite";
import {Link} from 'react-router-dom'


class SideBar extends Component {
    constructor() {
        super();
        this.state = {
            expanded: true,
        };
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        const { expanded } = this.state;

        return (
            <div className='rs-sidebar-wrapper fixed' style={{ width: 250}}>
                    <Sidenav
                        expanded={expanded}
                        activeKey={this.state.activeKey}
                        onSelect={this.handleSelect}
                    >
                        <Sidenav.Body style={{height: '96vh'}}>
                            <Nav>
                                <Nav.Item componentClass={Link} to='/search' icon={<Icon icon="search" />}>
                                    Explore
                                </Nav.Item>
                                <Dropdown
                                    placement="rightTop"
                                    title="Ratings"
                                    icon={<Icon icon="star-o"/>}
                                >
                                    <Dropdown.Item componentClass={Link} to='/upload' icon={<Icon icon="file-upload"/>}>Upload Attack Log File</Dropdown.Item>
                                </Dropdown>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
            </div>
        );
    }
}

export default SideBar;
