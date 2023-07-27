import { getJSON } from "./helpers.js";
// import { stations } from "./stations.js";

export const state = {
  curTabe: null,
  curAudio: null,
  curListItem: null,
  audioElement: null,
  playing: false,
};

// Function to toggle the audio play/pause
export const toggleAudio = async function () {
  try {
    // If tabe is live,
    if (state.curTabe.live) {
      if (state.playing) {
        // pause the current audio if it's playing
        state.audioElement.pause();
        state.playing = false;
      } else {
        // if it's not playing, fetch the link from the API,
        const data = await getAudioAPI(state.curTabe.audios[0].link);
        // create a new audio element,
        state.audioElement = new Audio(data.mounts[0].url);
        // play audio, and set playing to true
        state.audioElement.play();
        state.playing = true;
      }
      return;
    }

    if (!state.audioElement) {
      // If audio element doesn't exist, create a new one, play it, and set 'playing' to true
      state.audioElement = new Audio(state.curAudio.link);
      state.audioElement.play();
      state.playing = true;
    } else if (state.curAudio.link === state.audioElement.src) {
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
      state.audioElement = new Audio(state.curAudio.link);
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
