import videojs from "video.js";

// used functional approach to create the plugin
function screenSeek(options) {
  //get the player width
  const playerWidth = this.player().currentWidth();
  const regionWidth = playerWidth / 3;
  this.on("dblclick", function (event) {
    event.preventDefault();
    // get click location
    const clickX = event.clientX;
    if (clickX < regionWidth) {
      // Clicked on the left side, go backward 10s
      this.currentTime(this.currentTime() - 10);
      // transition to the  backward seek icon
      const arrowLeft = document.querySelector(".backward-double-click-seek");
      arrowLeft.classList.add("active");
      setTimeout(() => {
        arrowLeft.classList.remove("active");
      }, 500);
      setTimeout(() => {
        arrowLeft.classList.remove("active");
      }, 500);
    } else if (clickX > regionWidth * 2) {
      // show hide on screen controls

      // Clicked on the right side, go forward 10s
      this.currentTime(this.currentTime() + 10);
      // transition to the  forward seek icon
      const arrowRight = document.querySelector(".forward-double-click-seek");
      arrowRight.classList.add("active");
      setTimeout(() => {
        arrowRight.classList.remove("active");
      }, 500);
    }
  });
  // double tap to seek 10s forward  and backward for mobile touch
  let lastTapTime = null;
  this.on("touchstart", function (event) {
    const currentTime = new Date().getTime();
    if (lastTapTime === null) {
      lastTapTime = currentTime;
    } else {
      if (currentTime - lastTapTime < 300) {
        // double tap
        const clickX = event.touches[0].clientX;
        console.log(clickX, regionWidth);
        if (clickX < regionWidth) {
          // Clicked on the left side, go backward 10s
          this.currentTime(this.currentTime() - 10);
          const arrowLeft = document.querySelector(
            ".backward-double-click-seek"
          );
          arrowLeft.classList.add("active");
          setTimeout(() => {
            arrowLeft.classList.remove("active");
          }, 500);
        } else if (clickX > regionWidth * 2) {
          // Clicked on the right side, go forward 10s
          this.currentTime(this.currentTime() + 10);
          const arrowright = document.querySelector(
            ".forward-double-click-seek"
          );
          arrowright.classList.add("active");
          setTimeout(() => {
            arrowright.classList.remove("active");
          }, 500);
        }
      }
      lastTapTime = null;
    }
  });
}

videojs.registerPlugin("screenSeek", screenSeek);

export default screenSeek;
