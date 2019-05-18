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
        let services = [...this.props.services];
        // Apply selected algorithm
        if(this.props.selectedAlgorithm !== 'DEFAULT') {
            services = services.sort((s1,s2) =>
                (this.props.selectedAlgorithm === 'manhattanDistance') ?
                    s1[this.props.selectedAlgorithm] < s2[this.props.selectedAlgorithm] ? 1: -1:
                    s1[this.props.selectedAlgorithm] > s2[this.props.selectedAlgorithm] ? 1: -1);
        }
        // Logic for displaying recommended services
        const indexOfLastService = currentPage * servicesPerPage;
        const indexOfFirstService = indexOfLastService - servicesPerPage;
        const currentServices = services.slice(indexOfFirstService, indexOfLastService);

        const renderServices = currentServices.map((service, index) => {
            return (
                <Service key={index} service={service} index={index} currentPage={this.state.currentPage} history={this.props.history}/>
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
