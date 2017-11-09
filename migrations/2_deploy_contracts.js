var SampleContract = artifacts.require("./SampleContract.sol");

module.exports = function(deployer, helper, accounts) {
  return deployer.deploy(SampleContract);
};
