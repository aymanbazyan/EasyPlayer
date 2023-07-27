export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && !data.length)) return;

    this._data = data;
    const markup = this._generateMarkup(this._data);

    this.clear();
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // 1) Create new virtual DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // 2) Select & save all new DOM elements
    // Convert from node lists to arrays:
    const curElements = Array.from(this._parentEl.querySelectorAll("*"));
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      // Compare curElements and newElements
      const curEl = curElements[i];

      // Update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      )
        curEl.textContent = newEl.textContent;

      // Update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  clear() {
    this._parentEl.innerHTML = "";
  }
}

// export default new View();
