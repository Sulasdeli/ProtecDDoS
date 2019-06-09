pragma solidity >=0.4.21 <0.6.0;

contract DMarketplace {

    address owner;

    constructor() public {
        owner = msg.sender;
    }

    mapping(address => string) services;
    uint addedServices = 0;

    // Events
    event serviceAdded(
        address provider,
        string serviceHash
    );

    event serviceVerified(
        bool isValid
    );

    function storeService(string memory serviceHash) public {
        //require(services[msg.sender] == '', 'User can only upload one service');
        services[msg.sender] = serviceHash;
        addedServices++;
        emit serviceAdded(msg.sender, serviceHash);
    }

    function verifyService(address provider, string memory hashToVerify) public view returns (bool){
        return keccak256(abi.encodePacked(services[provider])) == keccak256(abi.encodePacked(hashToVerify));
    }

    //    function addProvides() public {
    //        require(msg.sender == owner, 'User must be owner of contract');
    //        //TODO Only recognized providers should be able to add new services
    //    }

}
