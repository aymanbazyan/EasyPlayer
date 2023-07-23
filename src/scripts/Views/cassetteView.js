import View from "./View.js";

class CassetteView extends View {
  _cassettesContainer = document.querySelector(".cassettes");
  _cassettes;

  giveCassetteSelector(el) {
    this._cassettes.forEach((cassette) => {
      cassette.classList.remove("cassette-selected");
    });
    el.classList.add("cassette-selected");
  }

  startCassetteHandler(handler) {
    this._cassettes.forEach((cassette) => {
      cassette.addEventListener("click", (el) => {
        const cassetteEl = el.target.closest(".cassette");
        const cassetteMec = cassetteEl.querySelector(".cassette__mechanics");
        let live, selected;
        live = false;
        selected = false;

        if (cassetteEl.classList.contains("cassette-selected")) selected = true;
        if (cassetteMec.classList.contains("live")) live = true;

        handler(cassetteEl, selected, live);
      });
    });
  }

  cassettesRender(stations) {
    stations.map((station) => {
      const markup = `
      <li class="cassette">
      <div class="cassette__label">
          <div class="cassette__details">
              <div class="cassette__side">
                  ${station.name[0]}
              </div>
              <div class="cassette__info">
                  <div class="cassette__block">
                      <h1 class="cassette__block-title">
                          ${station.name}
                      </h1>
                      <div class="cassette__lines"></div>
                      <div class="cassette__spool">
                          <div class="cassette__circle"></div>
                          <div class="cassette__wire">
                              <img src="${station.img}" alt="station image">
                          </div>
                          <div class="cassette__circle"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="cassette__mechanics ${station.live ? " live" : ""}">
          <div class="cassette__tuning"></div>
          <div class="cassette__tuning"></div>
      </div>
  </li>
                   `;
      this._cassettesContainer.insertAdjacentHTML("beforeend", markup);
    });
    this._cassettes = document.querySelectorAll(".cassette");
  }
}

export default new CassetteView();
