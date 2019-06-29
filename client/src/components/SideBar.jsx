import React, { Component } from 'react';
import {Sidenav, Nav, Icon, Dropdown} from "rsuite";
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
            <div className='rs-sidebar-wrapper fixed' style={{ minWidth: 250}}>
                    <Sidenav
                        expanded={expanded}
                        activeKey={this.state.activeKey}
                        onSelect={this.handleSelect}
                    >
                        <Sidenav.Body style={{height: '96.8vh'}}>
                            <Nav>
                                <Nav.Item componentClass={Link} to='/explore' icon={<Icon icon="search" />}>
                                    Explore
                                </Nav.Item>
                                <Dropdown title="Marketplace" icon={<Icon icon="suitcase" />}>
                                    <Dropdown.Item componentClass={Link} to='/marketplace'> <Icon icon="plus" />Add new Service</Dropdown.Item>
                                    <Dropdown.Item componentClass={Link} to='/marketplace/verify'> <Icon icon="check-circle" />Verify</Dropdown.Item>
                                </Dropdown>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
            </div>
        );
    }
}

export default SideBar;
