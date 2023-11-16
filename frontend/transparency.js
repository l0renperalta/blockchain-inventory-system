class Transparency {
  constructor() {
    this.table = document.getElementById('transactionsTable');
    this.transactions = JSON.parse(localStorage.getItem('txs'));
    this.renderTableTransactions();
    this.table.children[0].style.backgroundColor = '#b0dcec';
  }

  renderTableTransactions() {
    this.transactions.map((t) => {
      const row = this.table.insertRow();
      row.innerHTML = `
        <tr> 
          <td>${t.tx.slice(0, 10)}...</td>
          <td>transferencia</td>
          <td>${t.blockNumber}</td>
          <td>${this.parseToLocalDate(t.timestamps)}</td>
          <td>${t.from.slice(0, 10)}...</td>
          <td>${t.to.slice(0, 10)}...</td>
        </tr>
      `;
      row.onclick = () => this.redirectToTransactionDetail(t.blockNumber);
      row.style.cursor = 'pointer';
      row.addEventListener('mouseenter', function () {
        this.style.backgroundColor = '#eee';
      });

      row.addEventListener('mouseleave', function () {
        this.style.backgroundColor = 'white';
      });
      this.table.children[1].append(row);
    });
  }

  parseToLocalDate(timestamps) {
    return new Date(timestamps * 1000).toLocaleString();
  }

  redirectToTransactionDetail(blockNumber) {
    window.location.href = `http://localhost:8000/views/transactionDetail.html?id=${blockNumber}`;
  }
}

const transparency = new Transparency();
