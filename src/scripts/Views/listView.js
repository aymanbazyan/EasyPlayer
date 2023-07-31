import View from "./View.js";

class ListView extends View {
  _lists = document.querySelectorAll(".list");
  _listHeaders = document.querySelectorAll(".list__header");
  _parentEl = document.querySelector(".list__audios");
  _bookmarksList = document.querySelector(".list__bookmarks");
  _tabeHeader = document.querySelector(".tabe-header");
  _radioTitle = document.querySelector(".tabe-title");
  _listItems;

  toggleList(hdr = this._tabeHeader) {
    const arr = hdr.querySelector(".list__header-arrow");
    const list = hdr.nextElementSibling;

    list.classList.toggle("list-hidden");
    arr.classList.toggle("fa-rotate-270");
  }

  openList(hdr = this._tabeHeader) {
    const arr = hdr.querySelector(".list__header-arrow");
    const list = hdr.nextElementSibling;

    list.classList.remove("list-hidden");
    arr.classList.add("fa-rotate-270");
  }

  updateTitle(title = "Please pick a tabe!") {
    const markup = `
    ${title}
    <i class="fa-solid fa-music"></i>
    `;
    this._radioTitle.innerHTML = markup;
  }

  _generateMarkup() {
    const items = this._parentEl.querySelectorAll(".list__audios-item");
    items.forEach((item) => item.remove());

    return this._data.map(this._generateMarkupPreview).join("");
  }

  updateBookmarksList(bookmarks) {
    const items = this._bookmarksList.querySelectorAll(".list__audios-item");
    items.forEach((item) => item.remove());

    bookmarks.map((bookmark) => {
      const markup = this._generateMarkupPreview(bookmark);
      this._bookmarksList.insertAdjacentHTML("beforeend", markup);
    });
  }

  _generateMarkupPreview(data) {
    return `
    <li class="list__audios-item" title="${data.name}">
    ${data.name} -
    ${data.duration}
    <i class="fa-solid fa-${
      data.selected ? "pause" : "play"
    } PlayPauseIcon"></i>
  </li>
   `;
  }

  addAudioBtn() {
    this._parentEl.innerHTML = "";
    const btns = `
    <button class="add-new-audio">Add new audio</button>
    <button class="clear-audios">Clear audios</button>
    `;
    this._parentEl.insertAdjacentHTML("afterbegin", btns);
  }

  updateListItemsSelector() {
    this._listItems = document.querySelectorAll(".list__audios-item");
    return this._listItems;
  }

  updatePlayPauseIcon(curItem) {
    const arr = [];
    this._listItems?.forEach((item) => {
      item.querySelector(".PlayPauseIcon").classList.add("fa-play");
      item.querySelector(".PlayPauseIcon").classList.remove("fa-pause");

      if (item.title === curItem.title) {
        arr.push(item);
      }
    });

    curItem.querySelector(".PlayPauseIcon").classList.remove("fa-play");
    curItem.querySelector(".PlayPauseIcon").classList.add("fa-pause");

    arr.forEach((item) => {
      item.querySelector(".PlayPauseIcon").classList.remove("fa-play");
      item.querySelector(".PlayPauseIcon").classList.add("fa-pause");
    });
  }

  listItemsHandler(handler) {
    this._lists.forEach((list) => {
      list.addEventListener("click", (e) => {
        const curItem = e.target.closest(".list__audios-item");
        if (!curItem) return;

        handler(curItem);
      });
    });
  }

  listHeaderHandler(handler) {
    this._listHeaders.forEach((header) => {
      header.addEventListener("click", (e) => {
        const hdr = e.target.closest(".list__header");
        handler(hdr);
      });
    });
  }
}

export default new ListView();
