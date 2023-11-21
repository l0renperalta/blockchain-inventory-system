export default class Modal {
  constructor() {
    this.productId = null;
    this.data = {};

    // this.formId = document.getElementById(formId);
    // this.addBtnId = document.getElementById(addBtnId);

    // MODAL ADD PRODUCT
    this.productForm = document.getElementById('productForm');
    this.addProductBtn = document.getElementById('addProductBtn');
    this.editProductForm = document.getElementById('editProductForm');
    this.editProductBtn = document.getElementById('editProductBtn');

    this.categoryForm = document.getElementById('categoryForm');
    this.addCategoryBtn = document.getElementById('addCategoryBtn');
    this.editCategoryForm = document.getElementById('editCategoryForm');
    this.editCategoryBtn = document.getElementById('editCategoryBtn');

    this.editId = document.getElementById('editProductId');
    this.editName = document.getElementById('editProductName');
    this.editDescription = document.getElementById('editProductDescription');
    this.totalStock = document.getElementById('totalStock');
    this.outputReason = document.getElementById('outputReason');
  }

  modalProductHandler(callback) {
    this.addProductBtn.onclick = () => {
      const form = new FormData(this.productForm);
      this.data['name'] = form.get('addProductName');
      this.data['description'] = form.get('addProductDescription');
      this.data['quantity'] = Number(form.get('addProductQuantity'));
      this.data['category'] = form.get('categoriesSelect');
      callback(this.data);
      return;
    };
  }

  modalCategoryHandler(callback) {
    this.addCategoryBtn.onclick = () => {
      const form = new FormData(this.categoryForm);
      this.data['name'] = form.get('addCategoryName');
      this.data['description'] = form.get('addCategoryDescription');
      callback(this.data);
      return;
    };
  }

  // modalAddHandler(callback) {
  //   this.addBtnId.onclick = () => {
  //     const form = new FormData(this.formId);
  //     this.data['name'] = form.get('addName');
  //     this.data['description'] = form.get('addDescription');
  //     if (Number(form.get('addQuantity')) > 0) this.data['quantity'] = Number(form.get('addQuantity'));
  //     if (form.get('categoriesSelect') !== null) this.data['category'] = form.get('categoriesSelect');
  //     callback(this.data);
  //   };
  // }

  setValues(values) {
    console.log(values);
    $('#editModal').modal('toggle');
    this.editId.value = values[0].toNumber();
    this.editName.value = values['1'];
    this.editDescription.value = values['2'];
    // // this.editQuantity.value = values['3'].toNumber();
    if (values[3]) {
      this.totalStock.innerText = `Stock total: ${values['3'].toNumber()}`;
      this.totalStock.style.fontStyle = 'italic';
    }
  }

  handleProductEdit(callback) {
    this.editProductBtn.onclick = () => {
      const form = new FormData(this.editProductForm);
      const newValues = {
        id: Number(this.editId.value),
        name: form.get('editProductName'),
        description: form.get('editProductDescription'),
        quantity: Number(form.get('editProductQuantity')),
        outputReason: this.outputReason.value,
      };

      callback(newValues);
    };
  }

  handleCategoryEdit(callback) {
    this.editCategoryBtn.onclick = () => {
      const form = new FormData(this.editCategoryForm);
      const newValues = {
        id: Number(this.editId.value),
        name: form.get('editProductName'),
        description: form.get('editProductDescription'),
      };
      callback(newValues);
    };
  }
}
