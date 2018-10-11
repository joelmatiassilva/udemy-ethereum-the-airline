var Migrations = artifacts.require("./Airline.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
