import React, { Component } from 'react';
import {
    Button,
    ButtonToolbar,
    Input,
} from "rsuite";
import CardHeader from "../views/CardHeader";
import {Card, CardContent, Typography} from "@material-ui/core";
import Web3 from "web3";
import DMarketplace from "../abis/build/contracts/DMarketplace";

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
        this.state.contract.methods
            .verifyService(this.state.serviceHash)
            .call({from: this.state.user})
            .then((result) => {
                console.log('is valid:', result)
            });
    };

    render() {
        return (
            <Card style={{borderRadius: "10px 10px 10px 10px", marginBottom: 80, marginTop: 45}}>
                <CardHeader title='Verify Protection Service' iconName='check-circle-o' backgroundColor='linear-gradient(0deg, #26c6da, #00acc1)'/>
                <CardContent>
                    <Typography variant="h5" style={{fontWeight: 'bold', fontSize: 18, textAlign: "center"}}>
                        Service Hash
                    </Typography>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 25, marginBottom: 40}}>
                        <Input style={{width: 585, textAlign: "center"}} onChange={(e) => this.setState({serviceHash: e})} value={this.state.serviceHash}/>

                    </div>

                    <ButtonToolbar>
                        <Button onClick={this.validateService} style={{background: 'linear-gradient(60deg, #66bb6a, #43a047)'}} appearance='primary'>Validate</Button>
                    </ButtonToolbar>
                </CardContent>
            </Card>
        );
    }
}

export default VerifyPage;
