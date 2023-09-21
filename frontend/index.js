class Login {
  constructor() {
    this.connectWallet();
  }

  connectWallet() {
    const connectBtn = document.getElementById('connectBtn');
    const account = document.getElementById('account');
    connectBtn.onclick = async () => {
      const accountHash = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // account.innerText += ` ${accountHash}`;

      setTimeout(() => {
        window.location.replace('http://localhost:8000/views/main.html');
        alert('Cuenta Conectada!');
      }, 1000);
    };
  }
}

const login = new Login();
