import React, { Component } from 'react';
import {Pagination, Panel, Tag} from "rsuite";
import {Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import styled from 'styled-components'
import PriceTag from "../views/PriceTag";

const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

const PaginationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    min-height: 600px;
    justify-content: space-between;
`;

class Services extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            servicesPerPage: 3
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event)
        });
    }

    render() {
        const {currentPage, servicesPerPage } = this.state;
        const services = this.props.services;
        // Logic for displaying recommended services
        const indexOfLastService = currentPage * servicesPerPage;
        const indexOfFirstService = indexOfLastService - servicesPerPage;
        const currentServices = services.slice(indexOfFirstService, indexOfLastService);

        const renderServices = currentServices.map((service, index) => {
            return (
                <Panel>
                    <Card style={styles.card}>
                        <CardMedia
                            style={styles.cover}
                            image="../../assets/cloudflare.jpg"
                        />
                        <div style={styles.details}>
                            <CardContent style={styles.content}>
                                <div>
                                    <Typography component="h6" variant="h6">
                                        {service.providerName + ': ' + service.serviceName}
                                    </Typography>
                                    <Typography component="p" color="textSecondary">
                                        {service.description}
                                    </Typography>
                                </div>
                            </CardContent>
                            <PriceTag service={service} index={index} pageNumber={this.state.currentPage}/>
                        </div>
                    </Card>
                </Panel>
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
