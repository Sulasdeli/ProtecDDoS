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
    TagPicker, Icon
} from "rsuite";
import regions from "../const/regions";
import serviceTypes from "../const/serviceTypes";
import attackTypes from "../const/attackTypes";
import deploymentTimes from "../const/deploymentTimes";
import leasingPeriods from "../const/leasingPeriods";
import { Web3Provider } from 'react-web3';
import Web3 from "web3";
import DMarketplace from '../abis/build/contracts/DMarketplace'
import {CopyToClipboard} from 'react-copy-to-clipboard';

let web3 = window.web3;

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

        let CONTRACT_ADDRESS;
        let web3Instance = null;

        if (typeof  web3 !== 'undefined') {
            web3Instance = new Web3(web3.currentProvider);
            if (web3Instance.givenProvider.networkVersion)
                CONTRACT_ADDRESS = DMarketplace.networks[web3Instance.givenProvider.networkVersion].address;
            else
            // NetworkVersion = 3 (Ropsten) / 5777 (Ganache)
                CONTRACT_ADDRESS = DMarketplace.networks["3"].address
        } else {
            alert('Please install a Web3 Provider (Metamask)')
        }

        const dMarketplaceContract = new web3Instance.eth.Contract(
            DMarketplace.abi,
            CONTRACT_ADDRESS
        );

        this.state = {
            service: {
                productName: "new product",
                provider: "Provider's name",
                description: "this is a description",
                region: ['EUROPE'],
                serviceType: ['REACTIVE'],
                attackType: ['APPLICATION'],
                deploymentTime: 'SECONDS',
                leasingPeriod: 'DAYS',
                price: 2400,
                transactionHash: '',
                serviceHash: ''
            },
            copied: false,
            user: null,
            web3: web3Instance,
            contract : dMarketplaceContract,
        };
    }

    componentDidMount() {
        this.getUser();

        // calculate the initial hash
        this.generateHash();

        // Listen for event
        const addEvent = this.state.contract.events.ServiceAdded();
        addEvent.on('data', (res) => {
            console.log(res)
        });
    }

    getUser() {
        return this.state.web3.eth
            .getAccounts()
            .then(addresses => {
                this.setState({
                    user:addresses[0]
                })
            })
            .catch(err => {
                console.log('error getting address ' + err);
            });
    }

    handleChange = name => event => {
        this.setState({
            copied: false,
            service: {
                ...this.state.service,
                [name]: event,
            }
        });

        setTimeout( () => this.generateHash(), 0)
    };

    submitService = () => {
        this.generateHash();
        this.state.contract.methods
            .storeService(this.state.service.serviceHash)
            .send({from: this.state.user})
            .then(res => console.log(res))
    };

    storeService = () => {
        console.log("sending the data to the db")
    };

    generateHash = () => {
        const {productName, provider, description, region, serviceType, attackType, deploymentTime, leasingPeriod, price} = this.state.service;
        let toHash = this.state.web3.eth.abi.encodeParameters(['string', 'string', 'string', 'string[]', 'string[]', 'string[]', 'string', 'string', 'uint'], [productName, provider, description, region, serviceType, attackType, deploymentTime, leasingPeriod, price]);
        let hashedService = this.state.web3.utils.keccak256(toHash);
        this.setState({
            service: {
                ...this.state.service,
                serviceHash: hashedService,
            }
        });
    };

    validateService = () => {
        this.state.contract.methods
            .verifyService(this.state.service.serviceHash)
            .call({from: this.state.user})
            .then((result) => {
                console.log('is valid:', result)
            });
    };

    render() {
        return (
            <Web3Provider onChangeAccount={()=>{window.location.reload()}}>
                <div style={{marginTop: 45}}>
                    <Card style={{borderRadius: "10px 10px 10px 10px", marginBottom: 45}}>
                        <CardHeader title='Add new Protection Service' iconName='plus' backgroundColor='linear-gradient(0deg, #66bb6a, #43a047)'/>
                        <CardContent>
                            <Form layout="horizontal">
                                <Typography variant="h5" style={{fontWeight: 'bold', fontSize: 25}}>
                                    General Information
                                </Typography>
                                <div style={styles.details}>
                                    <FormGroup>
                                        <ControlLabel>Product Name</ControlLabel>
                                        <Input
                                            style={{ ...styles.form}}
                                            value={this.state.service.productName} onChange={this.handleChange("productName")}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Provider</ControlLabel>
                                        <Input
                                            style={{ ...styles.form}}
                                            value={this.state.service.provider} onChange={this.handleChange("provider")}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Service Description</ControlLabel>
                                        <Input
                                            componentClass="textarea"
                                            rows={3}
                                            style={{ ...styles.form}}
                                            value={this.state.service.description} onChange={this.handleChange("description")}
                                        />
                                    </FormGroup>
                                </div>
                                <hr/>
                                <Typography variant="h5" style={{fontWeight: 'bold', fontSize: 25}}>
                                    Technical Details
                                </Typography>
                                <div style={styles.details}>
                                    <FormGroup>
                                        <ControlLabel>Coverage Region(s)</ControlLabel>
                                        <TagPicker data={regions} value={this.state.service.region} onChange={this.handleChange("region")} style={styles.form}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Service Type(s)</ControlLabel>
                                        <TagPicker data={serviceTypes} value={this.state.service.serviceType} onChange={this.handleChange("serviceType")} style={styles.form}/>
                                        <HelpBlock tooltip>Required</HelpBlock>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Attack Type(s)</ControlLabel>
                                        <TagPicker data={attackTypes} creatable value={this.state.service.attackType} onChange={this.handleChange("attackType")} style={styles.form}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Deployment Time</ControlLabel>
                                        <InputPicker data={deploymentTimes} value={this.state.service.deploymentTime} onChange={this.handleChange("deploymentTime")} style={styles.form}/>
                                    </FormGroup>
                                    <FormGroup style={styles.formGroup}>
                                        <ControlLabel>Leasing Period</ControlLabel>
                                        <InputPicker data={leasingPeriods} value={this.state.service.leasingPeriod} onChange={this.handleChange("leasingPeriod")} style={styles.form}/>
                                    </FormGroup>
                                    <FormGroup style={styles.formGroup}>
                                        <ControlLabel>Price</ControlLabel>
                                        <InputNumber value={this.state.service.price} onChange={this.handleChange("price")} postfix="USD" style={styles.form}/>
                                    </FormGroup>
                                </div>
                                <hr/>
                                <Typography variant="h5" style={{fontWeight: 'bold', fontSize: 20, textAlign: "center"}}>
                                    Generated Hash
                                </Typography>
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 25, marginBottom: 40}}>
                                    <Input style={{width: 585, textAlign: "center"}} value={this.state.service.serviceHash} disabled/>
                                    <div style={{marginLeft: 10, width: 50}}>
                                        {!this.state.copied ? (
                                            <CopyToClipboard text={this.state.service.serviceHash}
                                                             onCopy={() => this.setState({copied: true})}>
                                                <Icon icon={'copy-o'}/>
                                            </CopyToClipboard>
                                        ): (
                                            <div>
                                                <span>Copied!</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <FormGroup style={{float: 'right', marginBottom: '15px'}}>
                                    <ButtonToolbar>
                                        <Button onClick={this.submitService} style={{background: 'linear-gradient(60deg, #66bb6a, #43a047)'}} appearance='primary'>Submit</Button>
                                    </ButtonToolbar>
                                    <ButtonToolbar>
                                        <Button onClick={this.validateService} style={{background: 'linear-gradient(60deg, #66bb6a, #43a047)'}} appearance='primary'>VALIDATE</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </Web3Provider>
        );
    }
}

export default MarketplacePage;
