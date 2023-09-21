// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TestContract {
  
  struct Product {
    uint id;
    string name;
    uint quantity;
    bool avalible;
    uint createdAt;
  }

  event ProductAdded (
    uint id,
    string name,
    uint quantity,
    bool avalible,
    uint createdAt
  );

  event ProductDecreased (
    uint id,
    string name,
    uint quantity
  );

  mapping(address => mapping(uint => Product)) public products;
  mapping(address => uint) public productsCounter;

  constructor() {
    addNewProduct('product 1', 78);
    
  }

  function addNewProduct(string memory _name, uint _quantity) public {
    uint counter = productsCounter[msg.sender];
    products[msg.sender][counter] = Product(counter, _name, _quantity, true, block.timestamp);
    emit ProductAdded(counter, _name, _quantity, true, block.timestamp);
    productsCounter[msg.sender]++;
  }

  function getProduct(uint index) public view returns (uint, string memory, uint, bool, uint) {
    require(index < productsCounter[msg.sender], "Index out of bounds");
    Product storage product = products[msg.sender][index];
    return (product.id, product.name, product.quantity, product.avalible, product.createdAt);
  }

}
