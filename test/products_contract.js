const ProductsContract = artifacts.require("ProductsContract");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("ProductsContract", function (/* accounts */) {
  
  before(async () => {
    this.productsContract = await ProductsContract.deployed();
  })

  it("should assert true", async function () {
    this.productsContract;
    return assert.isTrue(true);
  });

  it("mapping products first element added", async () => {
    const result = await this.productsContract.addProduct();
    const eventRef = await result.logs[0].args;

    assert.equal(eventRef.id.toNumber(), 2);
    assert.equal(eventRef.name, 'papel');
    assert.equal(eventRef.description, 'papel de oficina a4');
  });

});
