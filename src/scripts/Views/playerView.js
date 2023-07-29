import View from "./View.js";

class PlayerView extends View {
  _playpauseBtn = document.querySelector(".playpause");
  _spinners = document.querySelectorAll(".spinner");
  _addToBookmark = document.querySelector(".radio__bookmark-btn");
  _playerTitle = document.querySelector(".radio__inner_1-header-title");

  startPlayBtn() {
    this._playpauseBtn.classList.remove("fa-play");
    this._playpauseBtn.classList.add("fa-pause");

    this._spinners.forEach((spinner) => {
      spinner.classList.add("fa-spin");
    });
  }

  stopPlayBtn() {
    this._playpauseBtn.classList.add("fa-play");
    this._playpauseBtn.classList.remove("fa-pause");

    this._spinners.forEach((spinner) => {
      spinner.classList.remove("fa-spin");
    });
  }

  togglePlayBtn() {
    this._playpauseBtn.classList.toggle("fa-play");
    this._playpauseBtn.classList.toggle("fa-pause");

    this._spinners.forEach((spinner) => {
      spinner.classList.toggle("fa-spin");
    });
  }

  toggleAddToBookmarkBtn() {
    this._addToBookmark.classList.toggle("fa-regular");
    this._addToBookmark.classList.toggle("fa-solid");
  }

  fillAddToBookmarkBtn() {
    this._addToBookmark.classList.remove("fa-regular");
    this._addToBookmark.classList.add("fa-solid");
  }

  emptyAddToBookmarkBtn() {
    this._addToBookmark.classList.add("fa-regular");
    this._addToBookmark.classList.remove("fa-solid");
  }

  addToBookmarksHandler(handler) {
    this._addToBookmark.addEventListener("click", () => {
      handler();
    });
  }

  playBtnHandler(handler) {
    this._playpauseBtn.addEventListener("click", () => {
      handler();
    });
  }

  updateTitle(title) {
    this._playerTitle.innerHTML = title;
  }
}

export default new PlayerView();
