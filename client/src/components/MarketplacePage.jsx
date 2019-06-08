import React, { Component } from 'react';
import CardHeader from "../views/CardHeader";
import {Card, CardContent, Typography} from "@material-ui/core";
import {
    Button,
    ButtonToolbar,
    ControlLabel,
    Form,
    FormGroup,
    HelpBlock,
    InputNumber,
    InputPicker,
    Input,
    TagPicker
} from "rsuite";
import regions from "../const/regions";
import serviceTypes from "../const/serviceTypes";
import attackTypes from "../const/attackTypes";
import deploymentTimes from "../const/deploymentTimes";
import leasingPeriods from "../const/leasingPeriods";

const styles = {
    form: {
        width: '525px'
    },
    formGroup: {
        display: 'flex',
        alignItems: "center"
    },
    details: {
        marginTop: 35,
        marginBottom: 40
    }
};

class MarketplacePage extends Component {
    constructor() {
        super();
        this.state = {
            productName: "new product",
            provider: "Provider's name",
            description: "this is a description",
            region: ['EUROPE'],
            serviceType: ['REACTIVE'],
            attackType: ['APPLICATION'],
            deploymentTime: 'SECONDS',
            leasingPeriod: 'DAYS',
            price: 2400,
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event
        });
    };

    submitService = () => {

    };

    render() {
        return (
            <div style={{marginTop: 45}}>
                <Card style={{borderRadius: "10px 10px 10px 10px", marginBottom: 45}}>
                    <CardHeader title='Add new Protection Service' iconName='plus' backgroundColor='linear-gradient(0deg, #66bb6a, #43a047)'/>
                    <CardContent>
                        <Form layout="horizontal">
                            <Typography variant="h5" style={{fontWeight: 'bold', fontSize: 20}}>
                                General Information
                            </Typography>
                            <div style={styles.details}>
                                <FormGroup>
                                    <ControlLabel>Product Name</ControlLabel>
                                    <Input
                                        style={{ ...styles.form}}
                                        value={this.state.productName} onChange={this.handleChange("productName")}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Provider</ControlLabel>
                                    <Input
                                        style={{ ...styles.form}}
                                        value={this.state.provider} onChange={this.handleChange("provider")}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Service Description</ControlLabel>
                                    <Input
                                        componentClass="textarea"
                                        rows={3}
                                        style={{ ...styles.form}}
                                        value={this.state.description} onChange={this.handleChange("description")}
                                    />
                                </FormGroup>
                            </div>
                            <hr/>
                            <Typography variant="h5" style={{fontWeight: 'bold', fontSize: 20}}>
                                Technical Details
                            </Typography>
                            <div style={styles.details}>
                                <FormGroup>
                                    <ControlLabel>Coverage Region(s)</ControlLabel>
                                    <TagPicker data={regions} value={this.state.region} onChange={this.handleChange("region")} style={styles.form}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Service Type(s)</ControlLabel>
                                    <TagPicker data={serviceTypes} value={this.state.serviceType} onChange={this.handleChange("serviceType")} style={styles.form}/>
                                    <HelpBlock tooltip>Required</HelpBlock>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Attack Type(s)</ControlLabel>
                                    <TagPicker data={attackTypes} creatable value={this.state.attackType} onChange={this.handleChange("attackType")} style={styles.form}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Deployment Time</ControlLabel>
                                    <InputPicker data={deploymentTimes} value={this.state.deploymentTime} onChange={this.handleChange("deploymentTime")} style={styles.form}/>
                                </FormGroup>
                                <FormGroup style={styles.formGroup}>
                                    <ControlLabel>Leasing Period</ControlLabel>
                                    <InputPicker data={leasingPeriods} value={this.state.leasingPeriod} onChange={this.handleChange("leasingPeriod")} style={styles.form}/>
                                </FormGroup>
                                <FormGroup style={styles.formGroup}>
                                    <ControlLabel>Price</ControlLabel>
                                    <InputNumber value={this.state.price} onChange={this.handleChange("price")} postfix="USD" style={styles.form}/>
                                </FormGroup>
                            </div>
                            <FormGroup style={{float: 'right', marginBottom: '15px'}}>
                                <ButtonToolbar>
                                    <Button onClick={this.submitService} style={{background: 'linear-gradient(60deg, #66bb6a, #43a047)'}} appearance='primary'>Submit</Button>
                                </ButtonToolbar>
                            </FormGroup>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default MarketplacePage;
