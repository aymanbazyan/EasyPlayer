import View from "./View.js";

class VolumeView extends View {
  _volumeLine = document.getElementById("volume-slider");

  changeVolumeHandler(handler) {
    this._volumeLine.addEventListener("input", () => {
      const volumeValue = this._volumeLine.value / 100;
      handler(volumeValue);
    });
  }
}

export default new VolumeView();
