import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import CreateScoreStrip from "./image_generator_injs";
import fetchScoreData from "./fetchScoreData";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function App() {
  const videoRef = useRef(null);
  const [overlayImageURL, setOverlayImageURL] = useState("");
  const [scoreData, setScoreData] = useState({
    batting_team_name: "",
    bowling_team_name: "",
    score: "",
    overs_bowled: "",
    batter_one: "",
    batter_one_score: "",
    batter_two: "",
    batter_two_score: "",
    bowler: "",
    bowler_figure: "",
  });
  const [streamKey, setStreamKey] = useState("");
  const [submittedKey, setSubmittedKey] = useState("");

  useEffect(() => {
    if (streamKey) {
      const fetchData = async () => {
        // console.log(streamKey);
        let data = await fetchScoreData(streamKey);
        console.log(data);
        if (data) {
          setScoreData(data);
        }
      };
      fetchData();
      const interval = setInterval(fetchData, 1000); // Fetch data every 1 second
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [streamKey]);

  useEffect(() => {
    if (overlayImageURL) {
      var player = videojs("live-video");
      const overlayImage = document.createElement("img");
      overlayImage.src = overlayImageURL;
      overlayImage.className = "overlay-image";
      player.el().appendChild(overlayImage);
      const videoElement = player.el().getElementsByTagName("video")[0];
      videoElement.style.transform = "rotate(-90deg)";
      // Handle fullscreen change
      player.on("fullscreenchange", function () {
        if (player.isFullscreen()) {
          overlayImage.style.position = "fixed";
          videoElement.style.top = "-37.5vh";
          videoElement.style.left = "0vw";
          videoElement.style.height = "175vh";
          videoElement.style.width = "100vw";
        } else {
          overlayImage.style.position = "absolute";
          videoElement.style.top = "-32.8vh";
          videoElement.style.left = "-30.85vw";
          videoElement.style.height = "150vh";
          videoElement.style.width = "140vw";
        }
      });
      videoElement.style.top = "-32.8vh";
      videoElement.style.left = "-30.85vw";
      videoElement.style.height = "150vh";
      videoElement.style.width = "140vw";
      // Cleanup function to remove the overlay image when the component unmounts
      return () => {
        const overlayImages =
          videoRef.current.parentNode.getElementsByClassName("overlay-image");
        if (overlayImages.length) {
          overlayImages[0].remove();
        }
      };
    }
  }, [overlayImageURL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedKey(streamKey);
  };

  return (
    <div className="video-container">
      <h1>Enjoy the match!!!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={streamKey}
          onChange={(e) => setStreamKey(e.target.value)}
          placeholder="Enter your stream key"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {submittedKey && (
        <div className="video-wrapper">
          <video
            id="live-video"
            className="video-js vjs-default-skin"
            controls
            preload="auto"
            ref={videoRef}
          >
            <source
              src={`http://35.154.14.164:8080/hls/${submittedKey}.m3u8`}
              type="application/x-mpegURL"
            />
            Your browser does not support the video tag.
          </video>
          <CreateScoreStrip
            batting_team_name={scoreData.batting_team_name}
            bowling_team_name={scoreData.bowling_team_name}
            score={scoreData.score}
            overs_bowled={scoreData.overs_bowled}
            batter_one={scoreData.batter_one}
            batter_one_score={scoreData.batter_one_score}
            batter_two={scoreData.batter_two}
            batter_two_score={scoreData.batter_two_score}
            bowler={scoreData.bowler}
            bowler_figure={scoreData.bowler_figure}
            setImageURL={setOverlayImageURL}
          />
        </div>
      )}
    </div>
  );
}

export default App;
