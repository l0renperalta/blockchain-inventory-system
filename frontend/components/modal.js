export default class Modal {
  constructor(formId) {
    this.productId = null;
    this.data = {};

    this.addModalForm = document.getElementById(formId);
    this.addModalBtn = document.getElementById('addModalBtn');

    this.editModalForm = document.getElementById('editModalForm');
    this.editModalBtn = document.getElementById('editModalBtn');
    this.editName = document.getElementById('editName');
    this.editDescription = document.getElementById('editDescription');
    this.editQuantity = document.getElementById('editQuantity');
  }

  modalAddHandler(callback) {
    this.addModalBtn.onclick = () => {
      const form = new FormData(this.addModalForm);
      this.data['name'] = form.get('addName');
      this.data['description'] = form.get('addDescription');
      if (Number(form.get('addQuantity')) > 0) this.data['quantity'] = Number(form.get('addQuantity'));
      if (form.get('addCategory') !== null) this.data['category'] = form.get('addCategory');
      callback(this.data);
    };
  }

  setValues(productValues) {
    $('#editModal').modal('toggle');
    this.productId = productValues['0'].toNumber();
    this.editName.value = productValues['1'];
    this.editDescription.value = productValues['2'];
    this.editQuantity.value = productValues['3'].toNumber();
  }

  editProduct(callback) {
    this.editModalBtn.onclick = () => {
      const form = new FormData(this.editModalForm);
      callback(this.productId, Number(form.get('editQuantity')));
    };
  }
}
