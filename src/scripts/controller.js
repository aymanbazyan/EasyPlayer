import * as model from "./model.js";
import { stations, updateDuration } from "./stations.js";
import PlayerView from "./Views/playerView.js";
import CassetteView from "./Views/cassetteView.js";
import ListView from "./Views/listView.js";

const controlTogglePlaying = function () {
  if (model.state.curAudio) PlayerView.togglePlayBtn();

  if (model.state.curAudio && !model.state.curTabe.live) model.toggleAudio();

  if (model.state.curTabe?.live && model.state.playing) {
    model.state.audioElement.pause();
    model.state.playing = false;
  } else if (
    !model.state.playing &&
    model.state.curAudio?.duration === "live"
  ) {
    model.state.audioElement.play();
    model.state.playing = true;
  }
};

const controlAddToBookmarks = function () {
  PlayerView.toogleAddToBookmark();
};

const controlRenderCassettes = function () {
  CassetteView.render(stations);
};

const controlStartCassette = function (el, selected, live, title) {
  const stationObj = stations.find((obj) => obj.name === title);
  model.state.curTabe = stationObj;

  ListView.updateTitle(model.state.curTabe.name);

  if (selected && live) {
    PlayerView.togglePlayBtn();
    model.toggleAudio();
  } else if (live && model.state.curTabe?.live) {
    PlayerView.startPlayBtn();
    PlayerView.updateTitle(model.state.curTabe.name);
    ListView.clear();

    if (model.state.curAudio?.selected) model.state.curAudio.selected = false;
    model.state.curAudio = model.state.curTabe.audios[0];
    model.state.playing = false;
    if (model.state.audioElement) model.state.audioElement.pause();
    model.toggleAudio();
  } else if (!model.state.playing) {
    PlayerView.stopPlayBtn();
  }

  CassetteView.giveCassetteSelector(el);

  if (!live && !selected) ListView.openList();

  if (!live && selected) ListView.toggleList();

  if (!live) ListView.render(model.state.curTabe.audios);

  ListView.updateListItemsSelector();
};

const controlList = function (hdr) {
  ListView.toggleList(hdr);
};

const controlListItems = function (curItem) {
  model.state.curListItem = curItem;
  if (model.state.curAudio?.selected) model.state.curAudio.selected = false;

  model.state.curAudio = model.state.curTabe.audios.find(
    (audio) => audio.name === curItem.id
  );

  if (!model.state.curTabe.live)
    model.state.curAudio.selected = !model.state.curAudio.selected;

  ListView.updatePlayPauseIcon(curItem);

  PlayerView.updateTitle(model.state.curTabe.name);
  model.toggleAudio();
  model.state.playing ? PlayerView.startPlayBtn() : PlayerView.stopPlayBtn();
};

const init = function () {
  updateDuration();
  controlRenderCassettes();
  PlayerView.playBtnHandler(controlTogglePlaying);
  PlayerView.addToBookmarksHandler(controlAddToBookmarks);
  CassetteView.startCassetteHandler(controlStartCassette);
  ListView.listHeaderHandler(controlList);
  ListView.listItemsHandler(controlListItems);
};

document.addEventListener("DOMContentLoaded", init);
