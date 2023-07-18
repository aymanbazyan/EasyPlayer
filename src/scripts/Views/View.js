class View {
  playpauseBtn = document.querySelector(".playpause");
  spinners = document.querySelectorAll(".spinner");

  togglePlayBtn() {
    this.playpauseBtn.classList.toggle("fa-play");
    this.playpauseBtn.classList.toggle("fa-pause");

    this.spinners.forEach((spinner) => {
      spinner.classList.toggle("fa-spin");
    });
  }

  playBtnHandler(handler) {
    this.playpauseBtn.addEventListener("click", () => {
      this.togglePlayBtn();
      //   handler();
    });
  }
}
export default new View();
