// import { formatTime } from "./model.js";

export const stations = [
  {
    name: "Local Storage",
    img: "../content/stations/local.jpg",
    audios: [],
  },
  {
    name: "Aymen alrabadi",
    img: "https://avatars.githubusercontent.com/u/103147442?v=4",
    audios: [
      {
        name: "ماض كالسيف",
        link: "https://ia902709.us.archive.org/8/items/20230722_20230722_1516/%D9%85%D8%A7%D8%B6%20%D9%83%D8%A7%D9%84%D8%B3%D9%8A%D9%81.mp3",
      },
      {
        name: "ما هم بأمة أحمد",
        link: "https://ia902709.us.archive.org/8/items/20230722_20230722_1516/%D9%85%D8%A7%20%D9%87%D9%85%20%D8%A8%D8%A3%D9%85%D8%A9%20%D8%A7%D8%AD%D9%85%D8%AF.mp3",
      },
    ],
  },

  {
    name: "Salim alruwiliy",
    img: "https://i1.sndcdn.com/artworks-000620509606-wcqwew-t500x500.jpg",
    audios: [
      {
        name: "سورة يوسف",
        link: "https://ia801408.us.archive.org/29/items/salem-alruwiliy/012.mp3",
      },
      {
        name: "سورة يس",
        link: "https://ia801408.us.archive.org/29/items/salem-alruwiliy/036.mp3",
      },
    ],
  },

  {
    name: "Fajr",
    img: "https://cdn.alweb.com/thumbs/salawate/article/fit710x532/%D9%83%D9%8A%D9%81-%D8%A3%D8%B9%D8%B1%D9%81-%D8%B7%D9%84%D9%88%D8%B9-%D8%A7%D9%84%D9%81%D8%AC%D8%B1-%D8%A7%D9%84%D8%B5%D8%A7%D8%AF%D9%82.jpg",
    live: true,
    audios: [
      {
        name: "اذاعة الفجر",
        link: "https://alfaj.re/api/station/1",
        duration: "live",
      },
    ],
  },
];

export const updateDuration = function () {
  stations.map((obj) => {
    if (obj.live) return;

    obj.audios?.map((audio) => {
      const audioElement = new Audio(audio.link);

      audioElement.addEventListener("loadedmetadata", () => {
        const duration = audioElement.duration;
        const minutes = Math.floor(duration / 60);
        const remainderSeconds = Math.floor(duration % 60);
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(remainderSeconds).padStart(2, "0");
        const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
        Object.assign(audio, { duration: formattedTime });
      });
    });
  });
};
