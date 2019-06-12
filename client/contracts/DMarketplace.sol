pragma solidity >=0.4.21 <0.6.0;

contract DMarketplace {

    address owner;

    constructor() public {
        owner = msg.sender;
        // add one verified provider for testing
        address verifiedProvider = 0x68Ac74f5e4e1a61013194b8B00ff17fed9618409;
        providerToVerified[verifiedProvider] = true;
    }

    mapping(string => bool) services;
    mapping(string => address) servicesToProvider;
    mapping(address => bool) providerToVerified;

    // Events
    event ServiceAdded(
        string serviceHash
    );

    function storeService(string memory serviceHash) public {
        //require(services[serviceHash] == '', 'Service is already stored');
        services[serviceHash] = true;
        // Set a provider for a particular service once
        if (servicesToProvider[serviceHash] == address(0)) {
            servicesToProvider[serviceHash] = msg.sender;
        }
        emit ServiceAdded(serviceHash);
    }

    function verifyService(string memory hashToVerify) public view returns (bool, bool){
        return (services[hashToVerify], providerToVerified[servicesToProvider[hashToVerify]]);
    }

    function addVerifiedProviders(address provider) public {
        require(msg.sender == owner, 'Only the owner of the contract can add verified providers');
        require(providerToVerified[provider] == false, 'Provider is already verified');
        providerToVerified[provider] = true;
    }

}
