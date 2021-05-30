/* app code */
document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const resultDisplay = document.querySelector("#result");

  let width = 15; // grid width
  let currentShooterIndex = 202; // player start pos
  let currentInvaderIndex = 0; // invader start pos
  let alienInvadersTakenDown = [];
  let result = 0;
  let direction = 1;
  let invaderId;

  // define the invaders
  const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
  ];

  // draw the alien invaders
  alienInvaders.forEach((invader) =>
    squares[currentInvaderIndex + invader].classList.add("invader")
  );

  // draw the shooter
  squares[currentShooterIndex].classList.add("shooter");

  // move the shoooter along a line
  function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter");

    switch (e.keyCode) {
      case 37:
        console.log(e.keyCode);
        if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
        break;
      case 39:
        console.log(e.keyCode);
        if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
        break;
    }
    squares[currentShooterIndex].classList.add("shooter");
  }

  document.addEventListener("keydown", moveShooter);
});
