import videojs from "video.js";

// used Class approach to create the plugin
const Button = videojs.getComponent("Button");
// Define default values for the plugin's `forward` and `back` options
const defaults = {
  forwardIndex: 1,
  backIndex: 1,
};

const onPlayerReady = (player, options) => {
  player.addClass("vjs-seek-buttons");

  if (options.forward && options.forward > 0) {
    player.controlBar.seekForward = player.controlBar.addChild(
      "seekButton",
      {
        direction: "forward",
        seconds: options.forward,
      },
      options.forwardIndex
    );
  }

  if (options.back && options.back > 0) {
    player.controlBar.seekBack = player.controlBar.addChild(
      "seekButton",
      {
        direction: "back",
        seconds: options.back,
      },
      options.backIndex
    );
  }
};

const seekButtons = function (options) {
  this.ready(() => {
    onPlayerReady(this, videojs.obj.merge(defaults, options));
  });
};

class SeekButton extends Button {
  constructor(player, options) {
    super(player, options);
    if (this.options_.direction === "forward") {
      this.$(".vjs-icon-placeholder").classList.add("vjs-icon-forward-10");
    } else if (this.options_.direction === "back") {
      this.$(".vjs-icon-placeholder").classList.add("vjs-icon-replay-10");
    }

    if (this.options_.direction === "forward") {
      this.controlText(
        this.localize("Seek forward {{seconds}} seconds").replace(
          "{{seconds}}",
          this.options_.seconds
        )
      );
    } else if (this.options_.direction === "back") {
      this.controlText(
        this.localize("Seek back {{seconds}} seconds").replace(
          "{{seconds}}",
          this.options_.seconds
        )
      );
    }
  }

  buildCSSClass() {
    return (
      `vjs-seek-button skip-${this.options_.direction} ` +
      `skip-${this.options_.seconds} ${super.buildCSSClass()}`
    );
  }

  handleClick() {
    const now = this.player_.currentTime();

    if (this.options_.direction === "forward") {
      let duration = this.player_.duration();

      if (this.player_.liveTracker && this.player_.liveTracker.isLive()) {
        duration = this.player_.liveTracker.seekableEnd();
      }

      this.player_.currentTime(Math.min(now + this.options_.seconds, duration));
    } else if (this.options_.direction === "back") {
      this.player_.currentTime(Math.max(0, now - this.options_.seconds));
    }
  }
}
videojs.registerComponent("SeekButton", SeekButton);

videojs.registerPlugin("seekButtons", seekButtons);

export default seekButtons;
