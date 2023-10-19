import Modal from './components/modal.js';
import Table from './components/table.js';

class Products {
  constructor() {
    this.productsContract = null;
    this.account = '';
    this.web3Provider = null;
    this.products = [];
    this.categories = [];

    this.addBtn = document.getElementById('addBtn');
    this.addBtn.onclick = () => $('#addModal').modal('toggle');

    this.modal = new Modal('addProductForm');
    this.modal.modalAddHandler((data) => this.addNewProduct(data));
    this.modal.editProduct((_id, _quantity) => this.decreaseProductQuantity(_id, _quantity));

    this.table = new Table(this.categories);

    this.logoutBtn = document.getElementById('logoutBtn');
    this.logoutBtn.onclick = async () => {
      await web3Modal.clearCachedProvider();
    };
  }

  async getDeployedContract() {
    this.web3Provider = window.ethereum;
    const accounts = await this.web3Provider.request({ method: 'eth_requestAccounts' });
    this.account = accounts[0];
    const res = await fetch('http://localhost:8000/ProductsContract.json');
    const data = await res.json();

    const productsContract = TruffleContract(data);
    productsContract.setProvider(this.web3Provider);
    this.productsContract = await productsContract.deployed();
    this.setProducts();
    this.setCategories();
  }

  async setProducts() {
    let counter = await this.productsContract.productsCounter(this.account);
    for (let i = 0; i < counter.toNumber(); i++) {
      this.products.push(await this.productsContract.products(this.account, i));
    }

    this.table.renderProducts(this.products);
  }

  async setCategories() {
    const categoriesSelect = document.getElementById('categoriesSelect');
    let counter = await this.productsContract.categoriesCounter(this.account);
    for (let i = 0; i < counter.toNumber(); i++) {
      const categoryElement = await this.productsContract.categories(this.account, i);
      const option = document.createElement('option');
      option.innerText = categoryElement[1];
      option.setAttribute('id', categoryElement[0].toNumber());
      categoriesSelect.append(option);
      this.categories.push(categoryElement);
    }
  }

  async addNewProduct(data) {
    const { name, description, quantity, category } = data;
    let categoryId = this.categories.find((c) => c[1] === category);
    categoryId = categoryId[0].toNumber();
    await this.productsContract.addProduct(name, description, quantity, categoryId, { from: this.account });
    location.reload();
  }

  async decreaseProductQuantity(_id, _quantity) {
    await this.productsContract.decreaseProductQuantity(_id, _quantity, { from: this.account });
  }
}

const products = new Products();
products.getDeployedContract();
