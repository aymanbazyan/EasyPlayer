class View {
  _playpauseBtn = document.querySelector(".playpause");
  _spinners = document.querySelectorAll(".spinner");
  _addToBookmark = document.querySelector(".radio__bookmark-btn");

  _togglePlayBtn() {
    this._playpauseBtn.classList.toggle("fa-play");
    this._playpauseBtn.classList.toggle("fa-pause");

    this._spinners.forEach((spinner) => {
      spinner.classList.toggle("fa-spin");
    });
  }

  _toogleAddToBookmark() {
    this._addToBookmark.classList.toggle("fa-regular");
    this._addToBookmark.classList.toggle("fa-solid");
  }

  addToBookmarksHandler(handler) {
    this._addToBookmark.addEventListener("click", () => {
      this._toogleAddToBookmark();
      //   handler();
    });
  }

  playBtnHandler(handler) {
    this._playpauseBtn.addEventListener("click", () => {
      this._togglePlayBtn();
      //   handler();
    });
  }
}
export default new View();
