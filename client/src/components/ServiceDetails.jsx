import React, { Component } from 'react';
import styled from 'styled-components'
import {getDomain} from "../helpers/getDomain";
import {Alert, Loader, Divider} from "rsuite";
import {CardContent, Typography} from "@material-ui/core";
import ServiceLogo from "../views/ServiceLogo";
import {Card} from "@material-ui/core";
import ServiceTypography from "../views/ServiceTypography";
import FeatureTable from "../views/FeatureTable";

const Container = styled.div`
    width: 1500px;
    margin-top: 45px;
`;


class ServiceDetails extends Component {
    constructor() {
        super();
        this.state = {
            service: null,
            isLoading: false
        };
    }

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
                            <CardContent style={{display: 'flex', alignItems: 'center', marginTop: '15px'}}>
                                <ServiceLogo imageUrl={this.state.service.image} width={200} alignSelf="flex-start" marginRight="20px"/>
                                <div>
                                    <Typography variant="h5" style={{fontWeight: 'bold'}}>
                                        {this.state.service.serviceName}
                                    </Typography>
                                    <hr/>
                                    <ServiceTypography characteristic={"Provider"} text={this.state.service.providerName}/>
                                    <ServiceTypography characteristic={"Description"} text={this.state.service.description}/>
                                    <ServiceTypography characteristic={"Leasing Period"} text={this.state.service.leasingPeriod}/>
                                    <ServiceTypography characteristic={"Deployment Time"} text={this.state.service.deployment}/>
                                    <ServiceTypography characteristic={"Covered Region(s)"} text={this.state.service.region}/>
                                    <Divider/>
                                    <FeatureTable protectionFeatures={this.state.service.features}/>
                                </div>
                            </CardContent>
                        </Card>
                    }
                </Container>
        );
    }
}

export default ServiceDetails;
