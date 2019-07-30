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
    TagPicker, Icon, Alert
} from "rsuite";
import regions from "../const/regions";
import serviceTypes from "../const/serviceTypes";
import attackTypes from "../const/attackTypes";
import deploymentTimes from "../const/deploymentTimes";
import leasingPeriods from "../const/leasingPeriods";
import { Web3Provider } from 'react-web3';
import Web3 from "web3";
import DMarketplace from '../../build/contracts/DMarketplace'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {getDomain} from "../helpers/getDomain";
import { registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FileUploader from "../views/FileUploader";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

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
                imageContent: '',
                logo: null,
                productName: "new product",
                provider: "Provider's name",
                description: "this is a description",
                region: ['EUROPE'],
                serviceType: ['REACTIVE'],
                attackType: ['APPLICATION'],
                deploymentTime: 'SECONDS',
                leasingPeriod: 'DAYS',
                price: 2400,
                txHash: '',
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
        // calculate the default hash
        this.generateHash();
        // Listen for event
        const addEvent = this.state.contract.events.ServiceAdded();
        addEvent.on('data', (res) => {
            if (this.state.user && this.state.user !== res.returnValues.provider) {
                Alert.info('A User has submitted a service!')
            }
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
            service: {
                ...this.state.service,
                [name]: event,
            }
        });
        setTimeout( () => this.generateHash(), 0)
    };

    submitService = () => {
        // Generate the hash
        this.generateHash();
        // Store generated hash onto the Blockchain
        this.state.contract.methods
            .storeService(this.state.service.serviceHash)
            .send({from: this.state.user})
            .on('transactionHash', (txHash) => {
                this.setState({
                    service: {
                        ...this.state.service,
                        txHash: txHash
                    }
                });
                // Submit service to the server
                this.sendService()
            })
            .on('confirmation', (confirmationNumber) => {
                console.log("CONF Block:", confirmationNumber)
            })
            .on('receipt', (receipt) => {
                console.log("Receipt:", receipt)
            });
    };

    sendService = () => {
        let data = new FormData();
        data.append('file', this.state.service.logo);
        data.append('productName', this.state.service.productName);
        data.append('provider', this.state.service.provider);
        data.append('description', this.state.service.description);
        data.append('region', this.state.service.region);
        data.append('serviceType', this.state.service.serviceType);
        data.append('attackType', this.state.service.attackType);
        data.append('deploymentTime', this.state.service.deploymentTime);
        data.append('leasingPeriod', this.state.service.leasingPeriod);
        data.append('price', this.state.service.price);
        data.append('txHash', this.state.service.txHash);
        data.append('serviceHash', this.state.service.serviceHash);

        fetch(`${getDomain()}/v1/services`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: data
        })
            .then(res => res.json())
            .then(jsonResponse => {
                jsonResponse === 'Service stored successfully' ? Alert.success(jsonResponse) : Alert.error(jsonResponse)
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    Alert.error('The server cannot be reached');
                } else {
                    Alert.error( err.message);
                }
            });
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

    handleCopyToClipboard = () => {
        this.setState({copied: true});
        setTimeout(()=> this.setState({copied: false}), 1500)
    };

    render() {
        return (
            <Web3Provider onChangeAccount={()=>{window.location.reload()}}>
                <div style={{marginTop: 45}}>
                    <Card style={{borderRadius: "10px 10px 10px 10px", marginBottom: 80}}>
                        <CardHeader title='Add new Protection Service' iconName='plus' backgroundColor='linear-gradient(0deg, #66bb6a, #43a047)'/>
                        <CardContent>
                            <Form layout="horizontal">
                                <Typography variant="h5" style={{fontWeight: 'bold', fontSize: 25, marginTop: 12}}>
                                    General Information
                                </Typography>
                                <div style={styles.details}>
                                    <FormGroup>
                                        <ControlLabel>Logo</ControlLabel>
                                        <div style={{width: 707}}>
                                            <FileUploader handleFile={this.handleChange('logo')} handleFileContent={this.handleChange('imageContent')} fileType={'logo'} acceptedFiles={['image/png', 'image/jpeg']} label={'Drag & Drop an image or <span class="filepond--label-action">Browse</span>'}/>
                                        </div>
                                    </FormGroup>
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
                                    <div style={{marginLeft: 15, width: 50}}>
                                        {!this.state.copied ? (
                                            <CopyToClipboard text={this.state.service.serviceHash}
                                                             onCopy={this.handleCopyToClipboard}>
                                                <Icon icon={'copy-o'} size={"lg"}/>
                                            </CopyToClipboard>
                                        ): (
                                            <span style={{fontSize: 17}}>Copied!</span>
                                        )}
                                    </div>
                                </div>
                                <FormGroup style={{float: 'right', marginBottom: '15px'}}>
                                    <ButtonToolbar>
                                        <Button onClick={this.submitService} style={{background: 'linear-gradient(60deg, #66bb6a, #43a047)', fontSize: 17}} appearance='primary'>Submit</Button>
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
