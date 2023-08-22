class App{
  constructor() {
    this.connectWallet();
  }

  connectWallet() {
    const connectBtn = document.getElementById('connectBtn');
    const account = document.getElementById('account');
    connectBtn.onclick = async () => {
      const accountHash = await window.ethereum.request({method: 'eth_requestAccounts'});
      account.innerText += ` ${accountHash}`;
    }
  }
}

const app = new App();

