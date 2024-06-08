// fetchScoreData.js

async function fetchScoreData(streamKey) {
  try {
    // console.log("hiiii");
    // console.log(streamKey);
    // await new Promise((resolve) => setTimeout(resolve, 30000)); //wating 30 sec
    const response = await fetch(
      "https://gully6.com/api/v0/cricket/match/" +
        streamKey +
        "?getTopPerformers=true"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    //teames name
    //   console.log(data.data.currScore.battingTeamName);
    let batting_team_name = data.data.currScore.battingTeamName;
    let bowling_team_name = data.data.currScore.bowlingTeamName;

    //overall score
    let score = data.data.currScore.teamScore[batting_team_name].inningScore;
    //   console.log(batting_team_name);
    let overs_bowled =
      data.data.currScore.teamScore[batting_team_name].inningOver;

    //batter name and score
    // let batter_one = "Batter_one";
    let batter_one = data.data.currScore.teamScore[batting_team_name].onPitch.striker;
    let batter_one_score = data.data.currScore.teamScore[batting_team_name].onPitch.strikerScore;
    let batter_two = data.data.currScore.teamScore[batting_team_name].onPitch.nonStriker;
    let batter_two_score = data.data.currScore.teamScore[batting_team_name].onPitch.nonStrikerScore;
    // let batter_onstrike = 1;

    //bowler detail
    let bowler = data.data.currScore.teamScore[batting_team_name].onPitch.bowler;
    let bowler_figure = data.data.currScore.teamScore[batting_team_name].onPitch.bowlerScore;
    //   console.log(batting_team_name);
    await new Promise((resolve) => setTimeout(resolve, 20000));
    return {
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
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default fetchScoreData;
