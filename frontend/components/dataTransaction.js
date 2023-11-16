class DataTransaction {
  constructor() {
    // this.tx = data.transactionData.tx;
    // this.blockHash = data.transactionData.receipt.blockHash;
    // this.from = data.transactionData.receipt.from;
    // this.to = data.transactionData.receipt.to;
    // this.blockNumber = data.transactionData.receipt.blockNumber;
    // this.timestamps = data.transactionData.logs[0].args['4'].toNumber();
    this.detailDataObject = document.getElementById('transactionDetail');

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const id = params.get('id');
    this.transactions = JSON.parse(localStorage.getItem('txs'));
    this.txData = this.transactions.find((t) => t.blockNumber === Number(id));
    console.log(this.txData);
    this.showTransactionData();
  }

  showTransactionData() {
    this.detailDataObject.innerHTML = `
      <ul class="list-group list-group-flush">
        <li class="list-group-item py-4">${this.txData.tx}</li>
        <li class="list-group-item py-4">${this.txData.blockHash}</li>
        <li class="list-group-item py-4"><button class="btn btn-outline-success" disabled style="fontWeight: 800">Success</button></li>
        <li class="list-group-item py-4">${this.txData.blockNumber}</li>
        <li class="list-group-item py-4">${this.parseToLocalDate(this.txData.timestamps)}</li>
        <li class="list-group-item py-4">${this.txData.from}</li>
        <li class="list-group-item py-4">${this.txData.to}</li>
      </ul>
    `;
  }

  parseToLocalDate(date) {
    return new Date(date * 1000).toLocaleString();
  }
}

const dataTransaction = new DataTransaction();
