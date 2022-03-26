export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    const card = this._renderer(element)
    this._container.prepend(card);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this.addItem(item);
    });
  }
}
