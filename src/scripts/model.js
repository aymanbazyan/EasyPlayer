import { getJSON } from "./helpers.js";
// import { stations } from "./stations.js";

export const state = {
  curTabe: null,
  curAudio: null,
  curListItem: null,
  audioElement: null,
  playing: false,
  bookmarks: [],
};

// Function to toggle the audio play/pause
export const toggleAudio = async function () {
  try {
    let data = state.curAudio.link;

    // If tabe is live,
    if (state.curAudio.duration === "live") {
      const API = await getAudioAPI(state.curAudio.link);
      data = API.mounts[0].url;
    }

    if (!state.audioElement) {
      // If audio element doesn't exist, create a new one, play it, and set 'playing' to true
      state.audioElement = new Audio(data);
      state.audioElement.play();
      state.playing = true;
    } else if (data === state.audioElement.src) {
      // If the same audio is already playing, toggle between play and pause
      if (state.playing) {
        state.audioElement.pause();
        state.playing = false;
      } else {
        state.audioElement.play();
        state.playing = true;
      }
    } else {
      // If a different audio is selected, pause the current audio, create a new audio element, play it, and set 'playing' to true
      state.audioElement.pause();
      state.audioElement = new Audio(data);
      state.audioElement.play();
      state.playing = true;
    }
  } catch (err) {
    console.log(err);
  }
};

const getAudioAPI = async function (link) {
  try {
    return await getJSON(link);
  } catch (err) {
    console.log(err);
  }
};

export const addBookmark = function (audio) {
  // Add to bookmarks
  state.bookmarks.push(audio);

  // Mark current audio as bookmark
  if (audio.name === state.curAudio.name)
    Object.assign(state.curAudio, { bookmarked: true });

  // Remove selected key from bookmarks
  state.bookmarks.map((audio) => delete audio.selected);
};

export const deleteBookmark = function (name) {
  // Delete bookmark
  const index = state.bookmarks.findIndex((el) => el.name === name);
  state.bookmarks.splice(index, 1);

  // Mark current audio as NOT bookmarked
  if (name === state.curAudio.name) state.curAudio.bookmarked = false;
};

export const saveLocal = function (itemName, items) {
  localStorage.setItem(itemName, JSON.stringify(items));
};

export const getLocal = function (itemName, itemPlace) {
  const data = JSON.parse(localStorage.getItem(itemName));
  if (data) data.map((audio) => itemPlace.push(audio));
};

export const timeFormat = function (duration) {
  const minutes = Math.floor(duration / 60);
  const remainderSeconds = Math.floor(duration % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainderSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};
