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

    this.addBtn = document.getElementById('addBtn');
    this.addBtn.onclick = () => $('#addModal').modal('toggle');

    this.modal = new Modal('addProductForm');
    this.modal.modalAddHandler((data) => this.addNewProduct(data));
    this.modal.handleModalEdit((data) => this.handleEditProduct(data));

    this.table = new Table(this.categories);

    this.filters = new Filters(this.categories);

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

    // Espera a que setCategories() se complete antes de continuar
    await this.setCategories();

    // Ahora puedes realizar operaciones que dependan de las categorías
    await this.setProducts();
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
    const counter = await this.productsContract.categoriesCounter(this.account);
    const counterValue = counter.toNumber();

    const categoryPromises = Array.from({ length: counterValue }, async (_, i) => {
      const categoryElement = await this.productsContract.categories(this.account, i);
      return { id: categoryElement[0].toNumber(), title: categoryElement[1] };
    });

    const categories = await Promise.all(categoryPromises);

    categories.forEach((category) => {
      const option = document.createElement('option');
      option.innerText = category.title;
      option.setAttribute('id', category.id);
      categoriesSelect.append(option);
    });

    this.categories = categories;
  }

  async addNewProduct(data) {
    const { name, description, quantity, category } = data;
    let categorySelected = this.categories.find((c) => c.title === category);
    const transactionData = await this.productsContract.addProduct(name, description, quantity, categorySelected.id, { from: this.account });
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

  async handleEditProduct(data) {
    const { id, name, description, quantity } = data;
    console.log(id, name, description, quantity);
    const transactionData = await this.productsContract.editProduct(id, name, description, quantity, { from: this.account });
    this.handleLocalStoredTransactions(transactionData);
    location.reload();
  }
}

const products = new Products();
products.getDeployedContract();
