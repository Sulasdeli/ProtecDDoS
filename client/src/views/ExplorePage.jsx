
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
    Form, Header,
    ButtonGroup, Radio, RadioGroup
} from "rsuite";
import regions from "../const/regions";
import serviceTypes from "../const/serviceTypes";
import leasingPeriods from "../const/leasingPeriods";
import deploymentTimes from "../const/deploymentTimes";
import {getDomain} from "../helpers/getDomain";

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
                region: [''],
                serviceType: [''],
                deploymentTime: '',
                deploymentTimeWeight: 1,
                leasingPeriod: '',
                leasingPeriodWeight: 1,
                budget: 0,
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

    submitForm = () => {
        console.log(JSON.stringify(this.state.userProfile))
        fetch(`${getDomain()}/v1/recommend`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.userProfile)
        })
            .then(res => console.log(res))
            .then(jsonResponse => {
                console.log(jsonResponse);
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
                {!this.state.submitted ? (
                    <Userprofile>
                        <Card style={{marginTop: '50px'}}>
                            <CardHeader title='User Profile'/>
                            <CardContent>
                                <Form layout="horizontal">
                                    <FormGroup style={styles.formGroup}>
                                        <ControlLabel>Coverage Region(s)</ControlLabel>
                                        <TagPicker data={regions} onChange={this.handleChange("region")} style={styles.inputForm}  />
                                    </FormGroup>
                                    <FormGroup style={styles.formGroup}>
                                        <ControlLabel>Service Type(s)</ControlLabel>
                                        <TagPicker data={serviceTypes} onChange={this.handleChange("serviceType")} style={styles.inputForm}  />
                                        <HelpBlock tooltip>Required</HelpBlock>
                                    </FormGroup>
                                    <FormGroup style={styles.formGroup}>
                                        <ControlLabel>Deployment Time</ControlLabel>
                                        <InputPicker data={deploymentTimes} onChange={this.handleChange("deploymentTime")} style={styles.inputForm}/>
                                        &nbsp;
                                        &nbsp;
                                        <RadioGroup name="radioList" inline appearance="picker" defaultValue="A">
                                            <span style={styles.radioGroupLabel}>Priority: </span>
                                            <Radio onChange={this.handleChange("deploymentTimeWeight")} value="1">Low</Radio>
                                            <Radio onChange={this.handleChange("deploymentTimeWeight")} value="2">Medium</Radio>
                                            <Radio onChange={this.handleChange("deploymentTimeWeight")} value="3">High</Radio>
                                        </RadioGroup>
                                    </FormGroup>
                                    <FormGroup style={styles.formGroup}>
                                        <ControlLabel>Leasing Period</ControlLabel>
                                        <InputPicker data={leasingPeriods} onChange={this.handleChange("leasingPeriod")} style={styles.inputForm}/>
                                        &nbsp;
                                        &nbsp;
                                        <RadioGroup name="radioList" inline appearance="picker" defaultValue="A">
                                            <span style={styles.radioGroupLabel}>Priority: </span>
                                            <Radio onChange={this.handleChange("leasingPeriodWeight")} value="1">Low</Radio>
                                            <Radio onChange={this.handleChange("leasingPeriodWeight")} value="2">Medium</Radio>
                                            <Radio onChange={this.handleChange("leasingPeriodWeight")} value="3">High</Radio>
                                        </RadioGroup>
                                    </FormGroup>
                                    <FormGroup style={styles.formGroup}>
                                        <ControlLabel>Budget</ControlLabel>
                                        <InputGroup style={styles.inputForm}>
                                            <Input  onChange={this.handleChange("budget")}/>
                                            <InputGroup.Addon>.-</InputGroup.Addon>
                                        </InputGroup>
                                        &nbsp;
                                        &nbsp;
                                        <RadioGroup name="radioList" inline appearance="picker" defaultValue="A">
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
                ) : (
                    <div>
                        list of services
                    </div>
                )}
            </div>
        );
    }
}

export default ExplorePage;
