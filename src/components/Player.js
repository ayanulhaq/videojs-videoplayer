import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./videojs-plugins/seek-buttons";
import "./videojs-plugins/screen-seek";

export const Player = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);
      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
      //forward seek icon
      const forwardSeekIcon = document.createElement("span");
      forwardSeekIcon.classList.add("forward-double-click-seek");
      forwardSeekIcon.classList.add("vjs-icon-forward-10");
      //backward seek icon
      const backwardSeekIcon = document.createElement("span");
      backwardSeekIcon.classList.add("backward-double-click-seek");
      backwardSeekIcon.classList.add("vjs-icon-replay-10");
      videoElement.appendChild(forwardSeekIcon);
      videoElement.appendChild(backwardSeekIcon);
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className="video-main-div" data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default Player;
