export default class Modal {
  constructor() {
    this.modalName = document.getElementById('name');
    this.modalForm = document.getElementById('modalForm');
    this.modalDescription = document.getElementById('description');
    this.modalQuantity = document.getElementById('quantity');
    this.btn = document.getElementById('addModalBtn');

    this.editModalName = document.getElementById('editName');
    this.editModalForm = document.getElementById('editModalForm');
    this.editModalDescription = document.getElementById('editDescription');
    this.editModalQuantity = document.getElementById('editQuantity');
    this.editBtn = document.getElementById('editModalBtn');
    this.productId = null;
    this.data = {};
  }

  modalAddHandler(callback) {
    this.btn.onclick = () => {
      const form = new FormData(this.modalForm);
      this.data['name'] = form.get('name');
      this.data['description'] = form.get('description');
      this.data['quantity'] = form.get('quantity');
      callback(this.data);
    };
  }

  setValues(productValues) {
    $('#editModal').modal('toggle');
    this.productId = productValues['0'].toNumber();
    this.editModalName.value = productValues['1'];
    this.editModalDescription.value = productValues['2'];
    this.editModalQuantity.value = productValues['3'].toNumber();
  }

  editProduct(callback) {
    this.editBtn.onclick = () => {
      const form = new FormData(this.editModalForm);
      callback(this.productId, Number(form.get('editQuantity')));
    };
  }
}
