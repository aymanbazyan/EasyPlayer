import { getJSON } from "./helpers.js";

const links = [
  { name: "Al-fajr", link: "https://alfaj.re/api/station/1", live: true },
  {
    name: "Al-Quran",
    link: "",
  },
];

const getAudio = async function (stationName) {
  try {
    const stationObj = links.find((link) => link.name === stationName);

    const data = await getJSON(stationObj.link);

    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
// getAudio("Al-Quran");
