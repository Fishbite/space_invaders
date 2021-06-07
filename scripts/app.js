/* app code */
(function () {
  document.onreadystatechange();
})();
alert("click OK to start game :)");

const squares = document.querySelectorAll(".grid div");
const resultsDisplay = document.querySelector("#result");

let width = 15; // grid width
let currentShooterIndex = 202; // player start pos
let currentInvaderIndex = 0; // invader start pos
let alienInvadersTakenDown = [];
let aliensRemoved = [];
let result = 0;
let direction = 1;
let invadersId;

// define the invaders
// const alienInvaders = [0, 2];
const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

// draw the alien invaders
alienInvaders.forEach((invader) =>
  squares[currentInvaderIndex + invader].classList.add("invader")
);

// draw the shooter
squares[currentShooterIndex].classList.add("shooter");

// move the shoooter along a line
function moveShooter(e) {
  e.preventDefault();
  squares[currentShooterIndex].classList.remove("shooter");

  switch (e.keyCode) {
    case 37:
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
      break;
    case 39:
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
      break;
  }
  squares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

// move alien invaders
function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;

  if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
    direction = width;
  } else if (direction === width) {
    if (leftEdge) direction = 1;
    else direction = -1;
  }
  for (let i = 0; i <= alienInvaders.length - 1; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
  }
  for (let i = 0; i <= alienInvaders.length - 1; i++) {
    alienInvaders[i] += direction;
  }
  for (let i = 0; i <= alienInvaders.length - 1; i++) {
    if (!alienInvadersTakenDown.includes(i)) {
      squares[alienInvaders[i]].classList.add("invader");
    }
  }

  // decide if game is over
  if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    resultsDisplay.innerHTML = "GAME OVER";
    clearInterval(invadersId);
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > squares.length) {
      resultsDisplay.innerHTML = "GAME OVER";
      clearInterval(invadersId);
    }
  }

  // decide if win game
  if (alienInvadersTakenDown.length === alienInvaders.length) {
    resultsDisplay.textContent = "You Win!";
    clearInterval(invadersId);
  }
}
invadersId = setInterval(moveInvaders, 600);

//shoot at aliens
function shoot(e) {
  let laserId;

  let currentLaserIndex = currentShooterIndex;

  function moveLaser() {
    if (currentLaserIndex - width < 0) {
      squares[currentLaserIndex].classList.remove("laser");
      return;
    } else {
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add("laser");

      if (squares[currentLaserIndex].classList.contains("invader")) {
        squares[currentLaserIndex].classList.remove("laser");
        squares[currentLaserIndex].classList.remove("invader");
        squares[currentLaserIndex].classList.add("boom");

        setTimeout(
          () => squares[currentLaserIndex].classList.remove("boom"),
          300
        );
        clearInterval(laserId);

        const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
        // added next line to remove invaders.
        aliensRemoved.push(alienRemoved);
        alienInvadersTakenDown.push(alienRemoved);
        result++;
        resultsDisplay.innerHTML = result;
      }
    }
  }
  switch (e.key) {
    case "ArrowUp":
      laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener("keydown", shoot);
