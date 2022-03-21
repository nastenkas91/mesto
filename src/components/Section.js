export default class Section {
  constructor({ items, renderer}, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(element) {
    const card = this._renderer(element);
    this._container.prepend(card);
  }
}
