export default class Filters {
  constructor() {
    this.inputFilter = document.getElementById('inputFilter');
    this.filterCategories = document.getElementById('filterCategories');
    this.filterBtn = document.getElementById('filterBtn');
    this.table = document.getElementById('productsTable');

    this.filterBtn.onclick = () => this.filterRows();
  }

  filterRows() {
    const [, ...rows] = this.table.getElementsByTagName('tr');
    for (const row of rows) {
      const name = row.children[0].innerText;
      const description = row.children[1].innerText;
      const category = row.children[3].innerText;

      const optSelected = this.filterCategories.options[this.filterCategories.selectedIndex].value;

      let shouldHide = false;

      if (this.inputFilter.value) {
        shouldHide = !name.includes(this.inputFilter.value) && !description.includes(this.inputFilter.value);
      }

      if (optSelected !== 'all' && optSelected !== category) {
        shouldHide = true;
      }

      if (shouldHide) {
        row.classList.add('d-none');
      } else {
        row.classList.remove('d-none');
      }
    }
  }
}
