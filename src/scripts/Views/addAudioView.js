import View from "./View.js";

class AddAudioView extends View {
  _addAudioForm = document.querySelector(".add");
  _addName = document.getElementById("add-name");
  _addURL = document.getElementById("add-url");
  _addAudioWindow = document.querySelector(".add-audio-window");
  _addAudioCloseBtn = document.querySelector(".btn--close-modal");
  _overlay = document.querySelector(".overlay");
  _addAudioBtn;
  _clearAudiosBtn;

  _toggleAddAudioHidden() {
    this._addAudioWindow.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  _updateAddAudioBtnsSelector() {
    this._addAudioBtn = document.querySelector(".add-new-audio");
    this._clearAudiosBtn = document.querySelector(".clear-audios");
  }

  deleteAddAudioBtns() {
    if (this._addAudioBtn || this._clearAudiosBtn) {
      this._addAudioBtn.remove();
      this._clearAudiosBtn.remove();
    }
  }

  clearSavedAudios(handler) {
    this._updateAddAudioBtnsSelector();

    this._clearAudiosBtn.addEventListener("click", handler);
  }

  addAudioHnadler() {
    this._updateAddAudioBtnsSelector();

    this._addAudioBtn.addEventListener("click", () => {
      this._toggleAddAudioHidden();
    });

    this._addAudioCloseBtn.addEventListener("click", () => {
      this._toggleAddAudioHidden();
    });

    this._overlay.addEventListener("click", () => {
      this._addAudioWindow.classList.toggle("hidden");
      this._overlay.classList.toggle("hidden");
    });
  }

  formSubmitHandler(handler) {
    this._addAudioForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = {
        name: this._addName.value,
        link: this._addURL.value,
      };

      this._addName.value = "";
      this._addURL.value = "";
      this._toggleAddAudioHidden();

      handler(data);
    });
  }
}

export default new AddAudioView();
