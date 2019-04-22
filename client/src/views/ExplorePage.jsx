import React, { Component } from 'react';
import {Card, CardContent} from "@material-ui/core";
import CardHeader from "./CardHeader";
import styled from "styled-components";
import {
    Button,
    ButtonToolbar,
    ControlLabel,
    FormGroup,
    HelpBlock,
    Input,
    InputGroup,
    InputPicker,
    TagPicker,
    Form,
    Radio, RadioGroup,
    Panel,
} from "rsuite";
import regions from "../const/regions";
import serviceTypes from "../const/serviceTypes";
import leasingPeriods from "../const/leasingPeriods";
import deploymentTimes from "../const/deploymentTimes";
import {getDomain} from "../helpers/getDomain";
import Service from '../views/Service'

const Userprofile = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1000px;
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
            submitted: false,
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
            submitted: true
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
                this.setState(
                    {
                        ...this.state,
                        services: jsonResponse
                    }
                )
                console.log(this.state.services)
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    console.log("The server cannot be reached");
                } else {
                    console.log(`Something went wrong : ${err.message}`);
                }
            });
    };

    render() {
        return (
            <div>
                <Userprofile>
                    <Card style={{marginTop: '50px'}}>
                        <CardHeader title='User Profile'/>
                        <CardContent>
                            <Form layout="horizontal">
                                <FormGroup style={styles.formGroup}>
                                    <ControlLabel>Coverage Region(s)</ControlLabel>
                                    <TagPicker data={regions} value={this.state.userProfile.region} onChange={this.handleChange("region")} style={styles.inputForm}  />
                                </FormGroup>
                                <FormGroup style={styles.formGroup}>
                                    <ControlLabel>Service Type(s)</ControlLabel>
                                    <TagPicker data={serviceTypes} value={this.state.userProfile.serviceType} onChange={this.handleChange("serviceType")} style={styles.inputForm}  />
                                    <HelpBlock tooltip>Required</HelpBlock>
                                </FormGroup>
                                <FormGroup style={styles.formGroup}>
                                    <ControlLabel>Deployment Time</ControlLabel>
                                    <InputPicker data={deploymentTimes} value={this.state.userProfile.deploymentTime} onChange={this.handleChange("deploymentTime")} style={styles.inputForm}/>
                                    &nbsp;
                                    &nbsp;
                                    <RadioGroup name="radioList" inline appearance="picker" defaultValue="1">
                                        <span style={styles.radioGroupLabel}>Priority: </span>
                                        <Radio onChange={this.handleChange("deploymentTimeWeight")} value="1">Low</Radio>
                                        <Radio onChange={this.handleChange("deploymentTimeWeight")} value="2">Medium</Radio>
                                        <Radio onChange={this.handleChange("deploymentTimeWeight")} value="3">High</Radio>
                                    </RadioGroup>
                                </FormGroup>
                                <FormGroup style={styles.formGroup}>
                                    <ControlLabel>Leasing Period</ControlLabel>
                                    <InputPicker data={leasingPeriods} value={this.state.userProfile.leasingPeriod} onChange={this.handleChange("leasingPeriod")} style={styles.inputForm}/>
                                    &nbsp;
                                    &nbsp;
                                    <RadioGroup name="radioList" inline appearance="picker" defaultValue="1">
                                        <span style={styles.radioGroupLabel}>Priority: </span>
                                        <Radio onChange={this.handleChange("leasingPeriodWeight")} value="1">Low</Radio>
                                        <Radio onChange={this.handleChange("leasingPeriodWeight")} value="2">Medium</Radio>
                                        <Radio onChange={this.handleChange("leasingPeriodWeight")} value="3">High</Radio>
                                    </RadioGroup>
                                </FormGroup>
                                <FormGroup style={styles.formGroup}>
                                    <ControlLabel>Budget</ControlLabel>
                                    <InputGroup style={styles.inputForm}>
                                        <Input value={this.state.userProfile.budget} onChange={this.handleChange("budget")}/>
                                        <InputGroup.Addon>.-</InputGroup.Addon>
                                    </InputGroup>
                                    &nbsp;
                                    &nbsp;
                                    <RadioGroup name="radioList" inline appearance="picker" defaultValue="1">
                                        <span style={styles.radioGroupLabel}>Priority: </span>
                                        <Radio onChange={this.handleChange("budgetWeight")} value="1">Low</Radio>
                                        <Radio onChange={this.handleChange("budgetWeight")} value="2">Medium</Radio>
                                        <Radio onChange={this.handleChange("budgetWeight")} value="3">High</Radio>
                                    </RadioGroup>
                                </FormGroup>
                                <FormGroup style={{float: 'right', marginBottom: '15px'}}>
                                    <ButtonToolbar>
                                        <Button htmlType="submit" onClick={this.submitForm} appearance="primary">Submit</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                        </CardContent>
                    </Card>
                </Userprofile>
            </div>
        );
    }
}

export default ExplorePage;
