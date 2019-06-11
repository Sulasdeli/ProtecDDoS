pragma solidity >=0.4.21 <0.6.0;

contract DMarketplace {

    address owner;

    constructor() public {
        owner = msg.sender;
    }

    mapping(string => bool) services;

    // Events
    event ServiceAdded(
        string serviceHash
    );

    function storeService(string memory serviceHash) public {
        //require(services[serviceHash] == '', 'Service is already stored');
        services[serviceHash] = true;
        emit ServiceAdded(serviceHash);
    }

    function verifyService(string memory hashToVerify) public view returns (bool){
        return !!services[hashToVerify];
    }

    //    function addProvides() public {
    //        require(msg.sender == owner, 'User must be owner of contract');
    //        //TODO Only recognized providers should be able to add new services
    //    }

}
