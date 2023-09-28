// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ProductsContract {
  
  constructor() {
    addProduct('name test', 'description test', 67);
    decreaseProductQuantity(0, 7);
  }

  struct Product {
    uint id;
    string productName;
    string productDescription;
    uint quantity;
    uint createdAt;
  }

  event ProductCreated (
    uint id,
    string productName,
    string productDescription,
    uint quantity,
    uint createdAt
  );

  event ProductDecreased (
    uint id,
    uint quantity
  );

  mapping (address => mapping(uint => Product)) public products;
  mapping (address => uint) public productsCounter;

  function addProduct(string memory _productName, string memory _productDescription, uint _quantity) public {
    uint counter = productsCounter[msg.sender];
    products[msg.sender][counter] = Product(counter, _productName, _productDescription, _quantity, block.timestamp);
    emit ProductCreated(counter, _productName, _productDescription, _quantity, block.timestamp);
    productsCounter[msg.sender]++;
  }

  function decreaseProductQuantity(uint _id, uint _quantity) public {
    Product memory product = products[msg.sender][_id];
    product.quantity -= _quantity;
    products[msg.sender][_id] = product;
    emit ProductDecreased(_id, _quantity); 
  }

  function deleteProduct(uint _id) public {
    delete products[msg.sender][_id];
  }

  function getProduct(uint _id) public view returns (uint, string memory, string memory, uint, uint) {
    require(_id < productsCounter[msg.sender], 'Product not found!');
    Product storage product = products[msg.sender][_id];
    return (product.id, product.productName, product.productDescription, product.quantity, product.createdAt);
  }

}
