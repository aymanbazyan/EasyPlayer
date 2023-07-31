import * as model from "./model.js";
import { stations, updateDuration } from "./stations.js";
import PlayerView from "./Views/PlayerView.js";
import CassetteView from "./Views/cassetteView.js";
import ListView from "./Views/listView.js";
import AddAudioView from "./Views/addAudioView.js";
import VolumeView from "./Views/volumeView.js";

const controlTogglePlaying = function () {
  if (!model.state.curAudio) return;

  PlayerView.togglePlayBtn();
  model.toggleAudio();
};

const controlAddToBookmarks = function () {
  // 0) If there's no audio, return
  if (!model.state.curAudio) return;

  // 1) Toggle bookmark icon
  PlayerView.toggleAddToBookmarkBtn();

  // 2) Add to bookmarks array
  if (
    !model.state.bookmarks.find(
      (audio) => audio.name === model.state.curAudio?.name
    )
  )
    model.addBookmark(model.state.curAudio);
  else model.deleteBookmark(model.state.curAudio.name);

  // 3) Render bookmarks
  ListView.updateBookmarksList(model.state.bookmarks);

  // 4) Save bookmarks to local storage
  model.saveLocal("bookmarks", model.state.bookmarks);
};

const controlStartCassette = function (el, selected, title) {
  // 0) Set curTabe
  model.state.curTabe = stations.find((obj) => obj.name === title);

  // 1) Give current Cassette the selected class
  CassetteView.giveCassetteSelector(el);

  // 2) Update the titles
  PlayerView.updateTitle(model.state.curTabe.name);
  ListView.updateTitle(model.state.curTabe.name);

  // 3) If the cassette was the local storage, add handlers to the add audio btn
  if (model.state.curTabe.name === "Local Storage") {
    ListView.addAudioBtn();
    AddAudioView.addAudioHnadler();
    AddAudioView.formSubmitHandler(addAudioControl);
    AddAudioView.clearSavedAudiosHandler(deleteAudiosControl);
  } else AddAudioView.deleteAddAudioBtns();

  // 4) Render the audios list
  ListView.render(model.state.curTabe.audios);

  // 5) If the cassette is not selected, open the audios list, if it's selected, toggle the list
  if (!selected) ListView.openList();
  else ListView.toggleList();
};

const controlList = function (hdr) {
  ListView.toggleList(hdr);
};

const watchDurationChange = function () {
  model.state.audioElement.addEventListener("timeupdate", () => {
    const curTime = model.timeFormat(
      Math.trunc(model.state.audioElement.currentTime)
    );
    PlayerView.updateDuration(model.state.curAudio.duration, curTime);
  });
};

const toggleBookmarkIcon = function () {
  model.state.bookmarks.find(
    (audio) => audio.name === model.state.curAudio?.name
  )
    ? PlayerView.fillAddToBookmarkBtn()
    : PlayerView.emptyAddToBookmarkBtn();
};

const controlListItems = async function (curItem) {
  try {
    // 0) Update items selectors
    ListView.updateListItemsSelector();

    // 1) Set curListItem
    model.state.curListItem = curItem;

    // 2) Toggle selected key if there's a curAudio
    if (model.state.curAudio?.selected) model.state.curAudio.selected = false;

    // 3) Set curTabe
    model.state.curTabe = stations.find((station) =>
      station.audios.some((audio) => audio.name === curItem.title)
    );

    // 4) Set curAudio
    model.state.curAudio = model.state.curTabe.audios.find(
      (audio) => audio.name === curItem.title
    );

    // 5) Toggle play/pause icon + change the player title
    ListView.updatePlayPauseIcon(curItem);
    PlayerView.updateTitle(model.state.curTabe.name);

    // 6) Update bookmark icon
    toggleBookmarkIcon();

    // 7) Toggle audio
    await model.toggleAudio();

    // 8) If the audio is playing, toggle play btn in the radio
    model.state.playing ? PlayerView.startPlayBtn() : PlayerView.stopPlayBtn();

    // 9) Display audio duration in the radio
    watchDurationChange();
  } catch (err) {
    console.log(err);
  }
};

const local = stations.find((station) => station.name == "Local Storage");
const addAudioControl = function (data) {
  local.audios.push(data);
  ListView.render(model.state.curTabe.audios);
  model.saveLocal("localAudio", local.audios);
};

const deleteAudiosControl = function () {
  local.audios = [];
  model.state.bookmarks = model.state.bookmarks.filter((book) => !book.local);
  ListView.render(model.state.curTabe.audios);
  ListView.toggleList();
  ListView.updateBookmarksList(model.state.bookmarks);
  model.saveLocal("localAudio", local.audios);
  model.saveLocal("bookmarks", model.state.bookmarks);
};

const changeVolumeControl = function (volumeValue) {
  if (model.state.audioElement) model.state.audioElement.volume = volumeValue;
};

const controlForwardBackward = function (forward, backward) {
  // 0) No curAudio or there's only 1 audio in the curTabe? return
  if (!model.state.curAudio || model.state.curTabe.audios.length - 1 === 0)
    return;

  // 1) Get curAudio index in curTabe audios
  let curIndex = model.state.curTabe.audios.findIndex(
    (aud) => aud === model.state.curAudio
  );

  // 2) If forward/backward button is clicked, change curIndex
  if (forward) {
    curIndex++;
    if (curIndex > model.state.curTabe.audios.length - 1) curIndex = 0;
  } else if (backward) {
    curIndex--;
    if (curIndex < 0) curIndex = model.state.curTabe.audios.length - 1;
  }
  // 3) Update curAudio
  model.state.curAudio = model.state.curTabe.audios[curIndex];

  // 4) Start playing new curAudio
  model.toggleAudio();

  // 5) Update audio duration
  watchDurationChange();

  // 6) Update bookmark icon
  toggleBookmarkIcon();

  // 7) Update play/pause icon in the lists
  const listItems = ListView.updateListItemsSelector();
  listItems.forEach((item) => {
    if (item.title === model.state.curAudio.name)
      model.state.curListItem = item;
  });
  console.log(model.state.curListItem);

  ListView.updatePlayPauseIcon(model.state.curListItem);
};

const init = function () {
  model.getLocal("localAudio", local.audios);
  model.getLocal("bookmarks", model.state.bookmarks);
  updateDuration();
  ListView.updateBookmarksList(model.state.bookmarks);
  ListView.listHeaderHandler(controlList);
  ListView.listItemsHandler(controlListItems);
  CassetteView.render(stations);
  CassetteView.startCassetteHandler(controlStartCassette);
  PlayerView.playBtnHandler(controlTogglePlaying);
  PlayerView.addToBookmarksHandler(controlAddToBookmarks);
  PlayerView.forwardBackwardHandler(controlForwardBackward);
  VolumeView.changeVolumeHandler(changeVolumeControl);
  console.log("EasyPlayer 1 - 0 Musicator3000");
};

document.addEventListener("DOMContentLoaded", init);
