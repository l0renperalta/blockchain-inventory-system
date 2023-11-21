// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ProductsContract {
  
  constructor() {}

  struct Product {
    uint id;
    string productName;
    string productDescription;
    uint quantity;
    uint createdAt;
    uint categoryId;
    string productOutput;
  }

  struct Category {
    uint id;
    string categoryName;
    string categoryDescription;
    uint createdAt;
  }

  event ProductCreated (
    uint id, string productName, string productDescription, uint quantity, uint createdAt, uint productCategory, string productOutput
  );

  event CategoryCreated(
    uint id, string categoryName, string categoryDescription, uint createdAt
  );

  event ProductEdited ( 
    uint id, string categoryName, string categoryDescription, uint quantity, uint createdAt, string productOutput
  );

  event CategoryEdited ( 
    uint id, string categoryName, string categoryDescription, uint createdAt
  );

  mapping (address => mapping(uint => Product)) public products;
  mapping (address => mapping(uint => Category)) public categories;
  mapping (address => uint) public productsCounter;
  mapping (address => uint) public categoriesCounter;

  function addProduct(string memory _productName, string memory _productDescription, uint _quantity, uint _categoryId, string memory _productOutput) public {
    require(_categoryId < categoriesCounter[msg.sender], 'Category not found!');
    
    uint counter = productsCounter[msg.sender];
    products[msg.sender][counter] = Product(counter, _productName, _productDescription, _quantity, block.timestamp, _categoryId, _productOutput);
    emit ProductCreated(counter, _productName, _productDescription, _quantity, block.timestamp, _categoryId, _productOutput);
    productsCounter[msg.sender]++;
  }

  function addCategory(string memory _name, string memory _description) public {
    uint counter = categoriesCounter[msg.sender];
    categories[msg.sender][counter] = Category(counter, _name, _description,  block.timestamp);
    emit CategoryCreated(counter, _name, _description, block.timestamp);    
    categoriesCounter[msg.sender]++;
  }

  function editProduct(uint _id, string memory _productName, string memory _productDescription, uint _quantity, string memory _productOutput) public {
    Product memory product = products[msg.sender][_id];
    product.productName = _productName;
    product.productDescription = _productDescription;
    product.quantity -= _quantity;
    products[msg.sender][_id] = product;
    emit ProductEdited(_id, _productName, _productDescription, _quantity, block.timestamp, _productOutput); 
  }

  function editCategory(uint _id, string memory _categoryName, string memory _categoryDescription) public {
    Category memory category = categories[msg.sender][_id];
    category.categoryName = _categoryName;
    category.categoryDescription = _categoryDescription;
    categories[msg.sender][_id] = category;
    emit CategoryEdited(_id, _categoryName, _categoryDescription, block.timestamp); 
  }

  function deleteProduct(uint _id) public {
    delete products[msg.sender][_id];
  }

  function getProduct(uint _id) public view returns (uint, string memory, string memory, uint, uint, uint) {
    require(_id < productsCounter[msg.sender], 'Product not found!');
    Product storage product = products[msg.sender][_id];
    return (product.id, product.productName, product.productDescription, product.quantity, product.createdAt, product.categoryId);
  }

  function getCategory(uint _id) public view returns (uint, string memory, string memory) {
    require(_id < categoriesCounter[msg.sender], 'Category not found!');
    Category storage category = categories[msg.sender][_id];
    return (category.id, category.categoryName, category.categoryDescription);
  }

}
