
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      from: '0xf929cdaeef2976e78c3a66a02e0ad5dc663eff18',
      gas: 7000000
    },
  },
  // rpc: {
  //   // Use the default host and port when not using ropsten
  //   host: "localhost",
  //   port: 8545,
  //   network_id: "*" // Match any network id
  // }
};