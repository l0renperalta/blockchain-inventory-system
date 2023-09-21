export default class Modal {
  constructor() {
    this.btn = document.getElementById('modalBtn');
    this.data = {};
  }

  onClick(callback) {
    this.btn.onclick = () => {
      const form = new FormData(document.getElementById('modalForm'));
      this.data['nombre'] = form.get('nombre');
      this.data['descripcion'] = form.get('descripcion');
      this.data['cantidad'] = form.get('cantidad');
      callback(this.data);
    };
  }
}
