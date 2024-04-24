import "./App.css";
import Player from "./components/Player";
import React, { useEffect, useState } from "react";
import videojs from "video.js";

function App() {
  const playerRef = React.useRef(null);
  const [key, setKey] = useState(0);
  const [, setScreen] = useState(window.screen.width);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://vjs.zencdn.net/v/oceans.mp4",
        type: "video/mp4",
      },
    ],
    // Seek buttons  options which are provided  by th videojs itself
    //  controlBar: {
    //   skipButtons: {
    //     backward: 10,
    //     forward: 10,
    //   },
    // },
    plugins: {
      // screenSeek custom  plugins
      seekButtons: {
        forward: 10,
        back: 10,
      },
      screenSeek: true,
    },
    userActions: {
      click: false,
      doubleClick: (e) => {
        e.preventDefault();
        console.log("double click");
      },
      hotkeys: {
        fullscreenKey: function (event) {
          return event.which === 86;
        },
      },
    },
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  // this code is  only for testing purpose   since the video.js height width is not updating on resize
  useEffect(() => {
    const handleResize = () => {
      setScreen((prev) => {
        if (prev === window.screen.width) {
          return prev;
        } else {
          setKey((prev) => prev + 1);
          return window.screen.width;
        }
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="main">
      <h1 className="heading-1">Video.js React App</h1>
      <div className="player-wrapper" key={key}>
        <Player options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
}

export default App;
