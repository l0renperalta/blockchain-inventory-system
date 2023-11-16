export default class Filters {
  constructor(categories) {
    this.filterCategories = document.getElementById('filterCategories');
    this.inputFilter = document.getElementById('inputFilter');

    console.log(this.filterCategories);
    console.log(this.inputFilter);

    this.setCategories(categories);
  }

  async setCategories(categories) {
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.innerText = category.title;
      option.setAttribute('id', category.id);
      filterCategories.append(option);
    });
  }
}
