import React, { Component } from 'react';
import {
    Loader,
    Alert,
    Button,
    ButtonToolbar, Icon,
    Input,
} from "rsuite";
import CardHeader from "../views/CardHeader";
import {Card, CardContent, Typography} from "@material-ui/core";
import Web3 from "web3";
import DMarketplace from "../../build/contracts/DMarketplace";

let web3 = window.web3;

class VerifyPage extends Component {

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
            serviceHash: '',
            web3: web3Instance,
            contract : dMarketplaceContract,
            user: null,
            isServiceStored: null,
            isProviderValid: null,
            isLoading: false
        };
    }

    componentDidMount() {
        this.getUser();
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

    validateService = () => {
        this.setState({
            isLoading: true
        });
        this.state.contract.methods
            .verifyService(this.state.serviceHash)
            .call({from: this.state.user})
            .then((result) => {
                setTimeout(() => {
                    this.setState({
                        isServiceStored: result.isServiceValid,
                        isProviderValid: result.isProviderVerified,
                        isLoading: false
                    });
                    if (!result.isServiceValid) {
                        Alert.error('Hash not stored on to the Blockchain!')
                    }
                }, 1500)
            });
    };

    render() {
        return (
            <Card style={{borderRadius: "10px 10px 10px 10px", marginBottom: 80, marginTop: 45, height: '450px'}}>
                <CardHeader title='Verify Protection Service' iconName='check-circle-o' backgroundColor='linear-gradient(0deg, #26c6da, #00acc1)'/>
                <CardContent>
                    <div style={{marginTop: 20}}>
                        <Typography variant="h5" style={{fontWeight: 'bold', fontSize: 20, textAlign: "center"}}>
                            Service Hash
                        </Typography>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 25, marginBottom: 40}}>
                            <Input style={{width: 585, textAlign: "center"}} onChange={(e) => this.setState({serviceHash: e})} value={this.state.serviceHash}/>
                        </div>
                        <ButtonToolbar style={{display: "flex", justifyContent: "flex-end"}}>
                            <Button onClick={this.validateService} style={{background: 'linear-gradient(60deg, #66bb6a, #43a047)', fontSize: 17}} appearance='primary'>Validate</Button>
                        </ButtonToolbar>
                    </div>
                    <hr/>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", height: 100}}>
                        {!this.state.isLoading ? (
                            <div>
                                {this.state.isServiceStored ? (
                                    <div>
                                        {this.state.isProviderValid ? (
                                                <div style={{color: '#008000'}}>
                                                    <Icon style={{marginRight: 5}} icon={'check-circle'} size={"lg"}/>
                                                    <span style={{fontSize:19}}>Trusted Provider</span>
                                                </div>
                                            ):
                                            <div style={{color: '#ff0000'}}>
                                                <Icon style={{marginRight: 5}} icon={'times-circle'} size={"lg"}/>
                                                <span style={{fontSize:19}}>Untrusted Provider</span>
                                            </div>
                                        }
                                        <div style={{color: '#008000', marginTop: 15}}>
                                            <Icon style={{marginRight: 5}} icon={'check-circle'} size={"lg"}/>
                                            <span style={{fontSize:19}}>Verified Service</span>
                                        </div>
                                    </div>
                                ): (
                                    <div>
                                        <Icon style={{marginRight: 5}} icon={'info'} size={"lg"}/>
                                        <span style={{fontSize:17}}>Enter a valid hash of a service</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Loader content='Verifying...' size="md" vertical/>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default VerifyPage;
