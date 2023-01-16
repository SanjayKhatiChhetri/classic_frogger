const increaseScore = () => {
  score += 10;
};

const reSpwan = () => {
  if (highScore < score) {
    highScore = score;
  }
  initialY = 700;
  gameSpeed += 0.05;
  frogObj.xAxis = frogImage.width / 2 - frogObj.boxWidth / 2;
  frogObj.yAxis = frogImage.height - frogObj.boxHeight - 50;
};
let lives = 3;

const resetGame = () => {
  lives--;

  if (lives <= 0) {
    alert("Out of Lives.You can always try again!!");
    highScore = 0;
    setTimeout(() => {
      document.location.reload();
    }, 1000);
  }

  frogObj.xAxis = frogImage.width / 2 - frogObj.boxWidth / 2;
  frogObj.yAxis = frogImage.height - frogObj.boxHeight - 50;
  score = 0;

  gameSpeed = 1;
  initialY = 510;
};
