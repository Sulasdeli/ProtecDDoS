const DMarketplace = artifacts.require("./DMarketplace");

module.exports = function(deployer) {
    deployer.deploy(DMarketplace);
};
