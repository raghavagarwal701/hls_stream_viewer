import React, { useRef, useEffect } from "react";
import html2canvas from "html2canvas";

const CreateScoreStrip = ({
  batting_team_name,
  bowling_team_name,
  score,
  overs_bowled,
  batter_one,
  batter_one_score,
  batter_two,
  batter_two_score,
  bowler,
  bowler_figure,
  setImageURL,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const stripImage = "./bg_score_strip.jpeg";
    const drawImage = async () => {
      // Load the background image
      const img = new Image();
      img.src = stripImage;
      img.onload = () => {
        //adding image background
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        //adding team names
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(batting_team_name, 200, 20);
        ctx.fillText(bowling_team_name, 810, 20);

        //adding player detials
        ctx.font = "20px Arial";
        ctx.fillText('> '+batter_one+ ':', 50, 50);
        ctx.fillText('   '+batter_two + ':', 50, 85);
        ctx.fillText(bowler + ':', 800, 65);
        ctx.font = "23px Arial";
        ctx.fillText(batter_one_score.runs + ' (' + batter_one_score.balls + ')', 210, 50);
        ctx.fillText(batter_two_score.runs + ' (' + batter_two_score.balls + ')', 210, 85);
        ctx.fillText(bowler_figure.wickets + '-' + bowler_figure.runsGiven, 960, 65);
        //adding score
        ctx.fillStyle = "gold";
        ctx.font = "40px Arial";
        ctx.fillText(score, 500, 70);
        ctx.font = "20px Arial";
        ctx.fillText(overs_bowled, 590, 65);

        const dataURL = canvas.toDataURL();
        setImageURL(dataURL);
      };
    };

    drawImage();
  }, [
    batting_team_name,
    bowling_team_name,
    score,
    overs_bowled,
    batter_one,
    batter_one_score,
    batter_two,
    batter_two_score,
    bowler,
    bowler_figure,
    setImageURL,
  ]);

  return (
    <div className="create-score-strip">
      <canvas
        ref={canvasRef}
        width={1120}
        height={100}
        style={{ display: "none" }}
      ></canvas>
    </div>
  );
};

export default CreateScoreStrip;

//   const saveImage = () => {
//     html2canvas(canvasRef.current).then((canvas) => {
//       const link = document.createElement('a');
//       link.download = 'score_strip.png';
//       link.href = canvas.toDataURL();
//       link.click();
//     });
//   };
