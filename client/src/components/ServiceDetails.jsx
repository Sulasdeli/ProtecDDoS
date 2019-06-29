import React, { Component } from 'react';
import styled from 'styled-components'
import {getDomain} from "../helpers/getDomain";
import {Alert, Loader, Divider, Icon} from "rsuite";
import {CardContent, Fab, Typography} from "@material-ui/core";
import ServiceLogo from "../views/ServiceLogo";
import {Card} from "@material-ui/core";
import ServiceTypography from "../views/ServiceTypography";
import FeatureTable from "../views/FeatureTable";
import Reviews from "../views/Reviews";
import AddReviewModal from "../views/AddReviewModal";
import {CopyToClipboard} from "react-copy-to-clipboard";

const Container = styled.div`
    width: 1200px;
    margin-top: 45px;
`;

const ReviewsHeaderContainer = styled.span`
    justify-content: space-between;
    display: flex;
    align-items: baseline;
    margin-bottom: 30px;
`;

class ServiceDetails extends Component {
    constructor() {
        super();
        this.state = {
            service: null,
            isLoading: false,
            show: false,
            copied: false
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
        this.getServiceDetails()
    }

    getServiceDetails = () => {
        this.setState({
            ...this.state,
            isLoading: true
        });

        fetch(`${getDomain()}/v1/services/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(jsonResponse => {
                this.setState({
                    ...this.state,
                    service: jsonResponse,
                });

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
    };

    // append the new review to the Service
    updateService = (newReview) => {
        let updatedService = this.state.service;
        updatedService.reviews.push(newReview);
        this.setState({
            ...this.state,
            service: updatedService
        })
    };

    handleCopyToClipboard = () => {
        this.setState({copied: true});
        setTimeout(()=> this.setState({copied: false}), 1500)
    };

    render() {
        return (
                <Container>
                    {this.state.isLoading && this.state.service === null ? (
                            <Loader backdrop content="loading..." vertical />
                        ):
                        <Card style={{borderRadius: "10px 10px 10px 10px", marginBottom: 80}}>
                            <CardContent>
                                <div style={{display: 'flex', alignItems: 'center', marginTop: '15px', padding: 10}}>
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

                                        <div style={{marginTop: 15}}>
                                            {!this.state.service.txHash || !this.state.service.serviceHash ? (
                                                <div style={{color: '#ffa500', marginTop: 25}}>
                                                    <Icon icon={'exclamation-circle2'} size={"2x"}/>
                                                    <span style={{fontWeight: 'bold', fontSize: 20, marginLeft: 7}}>Service not stored on the Blockchain</span>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div>
                                                        <h6 style={{fontWeight: 'bold', fontSize: 18, color: '#2b2828'}}>Service Hash</h6>
                                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                                            <Typography component="p" align="justify" color="textSecondary" style={{fontSize: 17, fontWeight: 'bold'}}>
                                                                {this.state.service.serviceHash}
                                                            </Typography>
                                                            <div style={{marginLeft: 10, width: 50}}>
                                                                {!this.state.copied ? (
                                                                    <CopyToClipboard text={this.state.service.serviceHash}
                                                                                     onCopy={this.handleCopyToClipboard}>
                                                                        <Icon icon={'copy-o'}/>
                                                                    </CopyToClipboard>
                                                                ): (
                                                                    <span>Copied!</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h6 style={{fontWeight: 'bold', fontSize: 18, color: '#2b2828'}}>Transaction Hash</h6>
                                                        <Typography component="p" align="justify" color="textSecondary" style={{fontSize: 17}}>
                                                            <a href={`https://ropsten.etherscan.io/tx/${this.state.service.txHash}`} target="_blank" rel="noopener noreferrer">{this.state.service.txHash}</a>
                                                        </Typography>
                                                        <Divider/>
                                                        <Typography variant="h4" style={{fontWeight: 'bold'}}>
                                                            Features
                                                        </Typography>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
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
                                                <AddReviewModal show={this.state.show} close={this.closeModal} serviceId={this.state.service.id} onNewReview={this.updateService}/>
                                            ): (null)}
                                        </ReviewsHeaderContainer>
                                        <hr/>
                                        <Reviews reviews={this.state.service.reviews}/>
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
