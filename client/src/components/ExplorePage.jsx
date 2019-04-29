import React, { Component } from 'react';
import {Card, CardContent} from "@material-ui/core";
import CardHeader from "../views/CardHeader";
import styled from "styled-components";
import {
    Button,
    ButtonToolbar,
    ControlLabel,
    FormGroup,
    HelpBlock,
    Alert,
    InputPicker,
    TagPicker,
    Form,
    Radio,
    RadioGroup,
    PanelGroup, InputNumber,
} from "rsuite";
import regions from "../const/regions";
import serviceTypes from "../const/serviceTypes";
import leasingPeriods from "../const/leasingPeriods";
import deploymentTimes from "../const/deploymentTimes";
import {getDomain} from "../helpers/getDomain";
import Services from "./Services";
import Loader from "../views/Loader"

const PageContent = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;  
  @media (max-width: 1800px) {
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const EmptyListContainer = styled.div`
  text-align: center;
  min-height: 600px;
  align-content: space-around;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const styles = {
    radioGroupLabel: {
        padding: '8px 12px',
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    inputForm: {
        width: '250px'
    },
    formGroup: {
        display: 'flex',
        alignItems: "flex-end"
    }
};


class ExplorePage extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            userProfile: {
                region: ['EUROPE'],
                serviceType: ['REACTIVE'],
                deploymentTime: 'SECONDS',
                deploymentTimeWeight: 1,
                leasingPeriod: 'DAYS',
                leasingPeriodWeight: 1,
                budget: 5000,
                budgetWeight: 1
            },
            services: []
        };
    }

    handleChange = name => event => {
        this.setState({
            userProfile: {
                ...this.state.userProfile,
                [name]: event
            }
        });
    };

    // Fetch services from server based on user profile
    submitForm = () => {
        this.setState({
            ...this.state,
            isLoading: true
        });

        fetch(`${getDomain()}/v1/recommend`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.userProfile)
        })
            .then(res => res.json())
            .then(jsonResponse => {

                this.setState({
                    ...this.state,
                    services: jsonResponse,
                });

                setTimeout(() => {
                    this.setState(
                        {
                            ...this.state,
                            isLoading: false
                        }
                    );
                }, 0)
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    Alert.error('The server cannot be reached');
                } else {
                    Alert.error( err.message);
                }
            });
    };

    render() {
        return (
                <PageContent>
                    <Card style={{marginTop: '25px'}}>
                        <CardHeader title='User Profile' iconName='vcard-o' backgroundColor='linear-gradient(0deg, #26c6da, #00acc1)'/>
                        <CardContent>
                            <Form layout="horizontal">
                                <FormGroup style={styles.formGroup}>
                                    <ControlLabel>Coverage Region(s)</ControlLabel>
                                    <TagPicker data={regions} value={this.state.userProfile.region} onChange={this.handleChange("region")} style={styles.inputForm}/>
                                </FormGroup>
                                <FormGroup style={styles.formGroup}>
                                    <ControlLabel>Service Type(s)</ControlLabel>
                                    <TagPicker data={serviceTypes} value={this.state.userProfile.serviceType} onChange={this.handleChange("serviceType")} style={styles.inputForm}/>
                                    <HelpBlock tooltip>Required</HelpBlock>
                                </FormGroup>
                                <FormGroup style={styles.formGroup}>
                                    <ControlLabel>Deployment Time</ControlLabel>
                                    <InputPicker data={deploymentTimes} value={this.state.userProfile.deploymentTime} onChange={this.handleChange("deploymentTime")} style={styles.inputForm}/>
                                    &nbsp;
                                    &nbsp;
                                    <RadioGroup name="radioList" inline appearance="picker" defaultValue={1}>
                                        <span style={styles.radioGroupLabel}>Priority: </span>
                                        <Radio onChange={this.handleChange("deploymentTimeWeight")} value={1}>Low</Radio>
                                        <Radio onChange={this.handleChange("deploymentTimeWeight")} value={2}>Medium</Radio>
                                        <Radio onChange={this.handleChange("deploymentTimeWeight")} value={3}>High</Radio>
                                    </RadioGroup>
                                </FormGroup>
                                <FormGroup style={styles.formGroup}>
                                    <ControlLabel>Leasing Period</ControlLabel>
                                    <InputPicker data={leasingPeriods} value={this.state.userProfile.leasingPeriod} onChange={this.handleChange("leasingPeriod")} style={styles.inputForm}/>
                                    &nbsp;
                                    &nbsp;
                                    <RadioGroup name="radioList" inline appearance="picker" defaultValue={1}>
                                        <span style={styles.radioGroupLabel}>Priority: </span>
                                        <Radio onChange={this.handleChange("leasingPeriodWeight")} value={1}>Low</Radio>
                                        <Radio onChange={this.handleChange("leasingPeriodWeight")} value={2}>Medium</Radio>
                                        <Radio onChange={this.handleChange("leasingPeriodWeight")} value={3}>High</Radio>
                                    </RadioGroup>
                                </FormGroup>
                                <FormGroup style={styles.formGroup}>
                                    <ControlLabel>Budget</ControlLabel>
                                    <InputNumber value={this.state.userProfile.budget} onChange={this.handleChange("budget")} postfix="CHF" style={styles.inputForm}/>
                                    &nbsp;
                                    &nbsp;
                                    <RadioGroup name="radioList" inline appearance="picker" defaultValue={1}>
                                        <span style={styles.radioGroupLabel}>Priority: </span>
                                        <Radio onChange={this.handleChange("budgetWeight")} value={1}>Low</Radio>
                                        <Radio onChange={this.handleChange("budgetWeight")} value={2}>Medium</Radio>
                                        <Radio onChange={this.handleChange("budgetWeight")} value={3}>High</Radio>
                                    </RadioGroup>
                                </FormGroup>
                                <FormGroup style={{float: 'right', marginBottom: '15px'}}>
                                    <ButtonToolbar>
                                        <Button htmlType="submit" onClick={this.submitForm} style={{background: 'linear-gradient(60deg, #66bb6a, #43a047)'}} appearance='primary'>Submit</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                        </CardContent>
                    </Card>
                    <br/>
                    <br/>
                    <Card style={{width: '800px'}}>
                        <PanelGroup>
                            <CardHeader title='Recommended Providers' iconName='thumbs-o-up' backgroundColor='linear-gradient(0deg, #ffa726, #fb8c00)'/>
                            {this.state.services.length > 0 ? (
                                this.state.isLoading ? (
                                    <Loader text='Loading...'/>
                                ) : (
                                    <Services services={this.state.services}/>
                                )
                            ) : (
                                <EmptyListContainer>
                                    <span>
                                        The List of recommended Services is empty
                                    </span>
                                </EmptyListContainer>
                            )}
                        </PanelGroup>
                    </Card>
                </PageContent>
        );
    }
}

export default ExplorePage;
