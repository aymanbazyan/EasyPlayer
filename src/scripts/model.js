import { getJSON } from "./helpers.js";
import { stations } from "./stations.js";

const getAudio = async function (station) {
  try {
    const stationLink = station.audios[0];

    const data = await getJSON(stationLink);

    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
