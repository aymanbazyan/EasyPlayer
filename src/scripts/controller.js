import * as model from "./model.js";
import { stations } from "./stations.js";
// import View from "./Views/View.js";
import PlayerView from "./Views/playerView.js";
import CassetteView from "./Views/cassetteView.js";
import playerView from "./Views/playerView.js";

const controlTogglePlaying = function () {
  PlayerView.togglePlayBtn();
};

const controlAddToBookmarks = function () {
  PlayerView.toogleAddToBookmark();
};

const controlRenderCassettes = function () {
  CassetteView.cassettesRender(stations);
};

const controlStartCassette = function (el, selected, live) {
  PlayerView.editPlayerTitle(el);
  console.log(selected, live);

  if (selected && live) {
    playerView.togglePlayBtn();
  } else if (live) {
    playerView.startPlayBtn();
  } else {
    playerView.stopPlayBtn();
  }

  CassetteView.giveCassetteSelector(el);
};

const init = function () {
  controlRenderCassettes();
  PlayerView.playBtnHandler(controlTogglePlaying);
  PlayerView.addToBookmarksHandler(controlAddToBookmarks);
  CassetteView.startCassetteHandler(controlStartCassette);
};

document.addEventListener("DOMContentLoaded", init);
