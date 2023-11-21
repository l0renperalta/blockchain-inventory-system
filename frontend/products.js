import Modal from './components/modal.js';
import Table from './components/table.js';
import Filters from './components/filters.js';

class Products {
  constructor() {
    this.productsContract = null;
    this.account = '';
    this.web3Provider = null;
    this.products = [];
    this.categories = [];

    this.addBtn = document.getElementById('addNewProduct');
    this.addBtn.onclick = () => $('#addProductModal').modal('toggle');

    this.modal = new Modal();
    this.modal.modalProductHandler((data) => this.handleAddNewProduct(data));
    this.modal.handleProductEdit((data) => this.handleEditProduct(data));

    this.table = new Table();
    this.filters = new Filters();

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

    await this.renderContractData();
  }

  async renderContractData() {
    await this.fetchProducts();
    await this.fetchCategories();

    this.table.renderProducts(this.products, this.categories);
    this.renderFilterOptions('filterCategories');
    this.renderFilterOptions('categoriesSelect');
  }

  async fetchProducts() {
    const productsCounter = await this.productsContract.productsCounter(this.account);
    for (let i = 0; i < Number(productsCounter); i++) {
      this.products.push(await this.productsContract.products(this.account, i));
    }
  }

  async fetchCategories() {
    const categoriesCounter = await this.productsContract.categoriesCounter(this.account);
    for (let i = 0; i < Number(categoriesCounter); i++) {
      this.categories.push(await this.productsContract.categories(this.account, i));
    }
  }

  renderFilterOptions(elementId) {
    const filterElement = document.getElementById(elementId);
    for (let i = 0; i < this.categories.length; i++) {
      const option = document.createElement('option');
      option.innerText = this.categories[i][1];
      option.setAttribute('id', Number(this.categories[i][0]));
      filterElement.append(option);
    }
  }

  async handleAddNewProduct(data) {
    const { name, description, quantity, category } = data;
    let categorySelected = this.categories.find((c) => c[1] === category);
    const transactionData = await this.productsContract.addProduct(name, description, quantity, Number(categorySelected[0]), '', { from: this.account });
    this.handleLocalStoredTransactions(transactionData);
    location.reload();
  }

  async handleEditProduct(data) {
    const { id, name, description, quantity, outputReason } = data;
    console.log(id, name, description, quantity, outputReason);
    const transactionData = await this.productsContract.editProduct(id, name, description, quantity, outputReason, { from: this.account });
    this.handleLocalStoredTransactions(transactionData);
    location.reload();
  }

  handleLocalStoredTransactions(transactionData) {
    const newTransaction = {
      tx: transactionData.tx,
      blockHash: transactionData.receipt.blockHash,
      from: transactionData.receipt.from,
      to: transactionData.receipt.to,
      blockNumber: transactionData.receipt.blockNumber,
      timestamps: Number(transactionData.logs[0].args['4']),
    };
    const storedTransactions = JSON.parse(localStorage.getItem('txs')) === null ? [] : JSON.parse(localStorage.getItem('txs'));
    storedTransactions.push(newTransaction);
    localStorage.setItem('txs', JSON.stringify(storedTransactions));
  }
}

const products = new Products();
products.getDeployedContract();
