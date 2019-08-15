var fs  = require('fs');
const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = "ENTER YOUR INFURA KEY HERE";

const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "5777", // Match any network id
      gas: 5000000
    },
      ropsten: {
          provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`),
          network_id: 3,       // Ropsten's id
          gas: 5500000,        // Ropsten has a lower block limit than mainnet
          confirmations: 0,    // # of confs to wait between deployments. (default: 0)
          timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
          skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
      },
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
