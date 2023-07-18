import * as model from "./model.js";
import View from "./Views/View.js";

const controlTogglePlaying = function () {
  //   console.log("tm");
};

const init = function () {
  View.playBtnHandler(controlTogglePlaying);
};
init();
