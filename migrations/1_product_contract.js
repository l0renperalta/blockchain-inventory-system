const ProductsContract = artifacts.require('ProductsContract');

module.exports = (deployer) => {
  deployer.deploy(ProductsContract);
}
