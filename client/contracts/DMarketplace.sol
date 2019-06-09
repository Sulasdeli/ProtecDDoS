pragma solidity >=0.4.21 <0.6.0;

contract DMarketplace {

    address owner;

    constructor() public {
        owner = msg.sender;
    }

    mapping(uint => string) services;
    uint addedServices = 0;

    // Events
    event ServiceAdded(
        uint index,
        string serviceHash
    );


    function storeService(string memory serviceHash) public {
        //require(services[msg.sender] == '', 'User can only upload one service');
        services[addedServices] = serviceHash;
        emit ServiceAdded(addedServices, serviceHash);
        addedServices++;
    }

    function verifyService(uint index, string memory hashToVerify) public view returns (bool){
        return keccak256(abi.encodePacked(services[index])) == keccak256(abi.encodePacked(hashToVerify));
    }

    //    function addProvides() public {
    //        require(msg.sender == owner, 'User must be owner of contract');
    //        //TODO Only recognized providers should be able to add new services
    //    }

}
