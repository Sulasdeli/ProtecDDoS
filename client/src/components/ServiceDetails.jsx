import React, { Component } from 'react';
import styled from 'styled-components'
import {getDomain} from "../helpers/getDomain";
import {Alert, Loader, Divider, Button, Icon, Panel} from "rsuite";
import {CardContent, Fab, Typography} from "@material-ui/core";
import ServiceLogo from "../views/ServiceLogo";
import {Card} from "@material-ui/core";
import ServiceTypography from "../views/ServiceTypography";
import FeatureTable from "../views/FeatureTable";
import Reviews from "../views/Reviews";
import AddReviewModal from "../views/AddReviewModal";

const Container = styled.div`
    width: 1200px;
    margin-top: 45px;
`;

const ReviewsHeaderContainer = styled.span`
    justify-content: space-between;
    display: flex;
    align-items: center;
`;

class ServiceDetails extends Component {
    constructor() {
        super();
        this.state = {
            service: null,
            isLoading: false,
            show: false
        };
    }

    closeModal = () => {
        this.setState({
            ...this.state,
            show: false
        });
    };
    openModal = () => {
        this.setState({
            ...this.state,
            show: true
        });
    };

    componentWillMount() {
        this.setState({
            ...this.state,
            isLoading: true
        });

        fetch(`${getDomain()}/v1/providers/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(jsonResponse => {

                this.setState({
                    ...this.state,
                    service: jsonResponse,
                });

                console.log(jsonResponse)

                setTimeout(() => {
                    this.setState(
                        {
                            ...this.state,
                            isLoading: false
                        }
                    );
                }, 1000)
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    Alert.error('The server cannot be reached');
                } else {
                    Alert.error( err.message);
                }
            });
    }


    render() {
        return (
                <Container>
                    {this.state.isLoading && this.state.service === null ? (
                            <Loader backdrop content="loading..." vertical />
                        ):
                        <Card style={{borderRadius: "10px 10px 10px 10px"}}>
                            <CardContent>
                                <div style={{display: 'flex', alignItems: 'center', marginTop: '15px'}}>
                                    <ServiceLogo imageUrl={this.state.service.image} width={200} alignSelf="flex-start" marginRight="20px"/>
                                    <div>
                                        <Typography variant="h5" style={{fontWeight: 'bold', fontSize: 35}}>
                                            {this.state.service.serviceName}
                                        </Typography>
                                        <hr/>
                                        <ServiceTypography characteristic={"Provider"} text={this.state.service.providerName}/>
                                        <ServiceTypography characteristic={"Description"} text={this.state.service.description}/>
                                        <div style={{display: 'flex'}}>
                                            <div style={{marginRight:100}}>
                                                <ServiceTypography characteristic={"Leasing Period"} text={this.state.service.leasingPeriod}/>
                                                <ServiceTypography characteristic={"Deployment Time"} text={this.state.service.deployment}/>
                                            </div>
                                            <div>
                                                <ServiceTypography characteristic={"Covered Region(s)"} text={this.state.service.region}/>
                                                <ServiceTypography characteristic={"Price"} text={this.state.service.price + ' ' +this.state.service.currency}/>
                                            </div>
                                        </div>
                                        <Divider/>
                                        <Typography variant="h4" style={{fontWeight: 'bold'}}>
                                            Features
                                        </Typography>
                                        <hr/>
                                        <FeatureTable protectionFeatures={this.state.service.features}/>
                                        <Divider/>
                                        <ReviewsHeaderContainer>
                                            <Typography variant="h4" style={{fontWeight: 'bold'}}>
                                                Reviews
                                            </Typography>
                                            <Fab style={{background: '#41a5f5'}} onClick={this.openModal} size="medium" aria-label="Add">
                                                <Icon icon="plus" style={{color: "white"}} size={"lg"}/>
                                            </Fab>
                                            {this.state.show ? (
                                                <AddReviewModal show={this.state.show} close={this.closeModal} serviceId={this.state.service.id}/>
                                            ): (null)}
                                        </ReviewsHeaderContainer>
                                        <hr/>
                                        <Reviews reviews={null}/>
                                        <Divider/>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    }
                </Container>
        );
    }
}

export default ServiceDetails;
