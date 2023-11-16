import Modal from './components/modal.js';

class Categories {
  constructor() {
    this.productsContract = null;
    this.account = '';
    this.web3Provider = null;
    this.categories = [];

    this.addBtn = document.getElementById('addBtn');
    this.addBtn.onclick = () => $('#addModal').modal('toggle');

    this.modal = new Modal('addCategoryForm');
    this.modal.modalAddHandler((data) => this.addNewCategory(data));

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
  }

  async setProducts() {
    let counter = await this.productsContract.categoriesCounter(this.account);
    for (let i = 0; i < counter.toNumber(); i++) {
      this.categories.push(await this.productsContract.categories(this.account, i));
    }
    console.log(this.categories);
    this.renderCategories();
  }

  renderCategories() {
    const table = document.getElementById('categoriesTable');
    this.categories.map((c) => {
      const row = table.insertRow();
      row.innerHTML = `
        <tr>
          <td>${c[1]}</td>
          <td>${c[2]}</td>
          <td style="display: flex; justify-content: space-evenly;">
            
          </td>
        </tr>`;

      const editBtn = document.createElement('div');
      editBtn.onclick = () => {
        this.modal.setValues({ ...c });
      };
      editBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" style="color: blue" width="18" height="18" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>`;
      row.children[2].append(editBtn);

      const deleteBtn = document.createElement('div');
      deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" style="color: red" width="18" height="18" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>`;

      row.children[2].append(deleteBtn);
    });
  }

  async addNewCategory(data) {
    const { name, description } = data;
    const transactionData = await this.productsContract.addCategory(name, description, { from: this.account });
    console.log(transactionData);
    location.reload();
  }
}

const categories = new Categories();
categories.getDeployedContract();
