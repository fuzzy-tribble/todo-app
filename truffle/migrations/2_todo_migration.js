const ToDo = artifacts.require("ToDo");

// Copy TODO ABI to src folder for app to use

module.exports = function (deployer) {
  deployer.deploy(ToDo);
};
