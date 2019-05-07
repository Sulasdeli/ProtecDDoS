import React, { Component } from 'react';
import {Pagination} from "rsuite";
import styled from 'styled-components'
import Service from "../views/Service";

const PaginationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    justify-content: space-between;
`;

class Services extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            servicesPerPage: 3
        };
    }

    handleClick = (event) => {
        this.setState({
            currentPage: Number(event)
        });
    };

    render() {
        const {currentPage, servicesPerPage } = this.state;
        const services = this.props.services;
        // Logic for displaying recommended services
        const indexOfLastService = currentPage * servicesPerPage;
        const indexOfFirstService = indexOfLastService - servicesPerPage;
        const currentServices = services.slice(indexOfFirstService, indexOfLastService);

        const renderServices = currentServices.map((service, index) => {
            return (
                <Service service={service} index={index} currentPage={this.state.currentPage} history={this.props.history}/>
            )
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(services.length / servicesPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <Container>
                {renderServices}
                <PaginationContainer>
                    <Pagination
                        prev
                        last
                        next
                        first
                        size="sm"
                        pages={pageNumbers.length}
                        activePage={this.state.currentPage}
                        onSelect={this.handleClick}
                    />
                </PaginationContainer>
                <br/>
            </Container>
        );
    }
}

export default Services;
