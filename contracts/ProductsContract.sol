// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ProductsContract {
  
  constructor() {
    addProduct();
  }

  uint public productCounter = 0;

  struct Product {
    uint id;
    string name;
    string description;
    uint quantity;
    uint createdAt;
  }

  mapping (uint id => Product) public products;

  function addProduct() public {
    products[productCounter] = Product(productCounter, 'papel', 'papel de oficina a4', 20, block.timestamp);
    productCounter++;
  }
  
  function decreaseProductQuantity() public {
    Product memory _product = products[0];
    _product.quantity++;
    products[0] = _product;
  }

}
