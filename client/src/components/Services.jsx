import React, { Component } from 'react';
import {Pagination, Panel} from "rsuite";
import {Card, CardContent, CardMedia, Typography} from "@material-ui/core";
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

class Services extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            servicesPerPage: 5
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event)
        });
    }

    handleSelect(eventKey) {
        this.setState({
            activePage: eventKey
        });
    }

    render() {
        const {currentPage, servicesPerPage } = this.state;
        const services = this.props.services;
        // Logic for displaying todos
        const indexOfLastService = currentPage * servicesPerPage;
        const indexOfFirstService = indexOfLastService - servicesPerPage;
        const currentServices = services.slice(indexOfFirstService, indexOfLastService);

        console.log(this.props.services)

        const renderServices = currentServices.map((service, index) => {
            return (
                <Panel header={service.providerName}>
                    <Card style={styles.card}>
                        <CardMedia
                            style={styles.cover}
                            image="client/src/views/cloudflare.jpg"
                        />
                        <div style={styles.details}>
                            <CardContent style={styles.content}>
                                <Typography component="h5" variant="h5">
                                    {service.id}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {service.providerName}
                                </Typography>
                            </CardContent>
                            <div>

                            </div>
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
            <div>
                <ul>
                    {renderServices}
                </ul>
                <Pagination
                    prev
                    last
                    next
                    first
                    size="lg"
                    pages={pageNumbers.length}
                    activePage={this.state.currentPage}
                    onSelect={this.handleClick}
                />
            </div>
        );
    }
}

export default Services;
