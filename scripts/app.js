(function () {
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      alert("click OK to start game :)");

      /* ****** app code ****** */
      const squares = document.querySelectorAll(".grid div");
      const resultsDisplay = document.querySelector("#result");

      // touch screen controls
      const lBtn = document.getElementById("leftBtn");
      const rBtn = document.getElementById("rightBtn");
      const fBtn = document.getElementById("fireBtn");

      let width = 15; // grid width
      let playerPos = 202; // player start pos
      let invaderPos = 0; // invader start pos
      let invadersShot = [];
      let invadersRemoved = [];
      let result = 0;
      let direction = 1;
      let invadersId;
      loser = 0;

      // define the invaders
      // const alienInvaders = [0, 2];
      const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      ];

      // draw the alien invaders
      alienInvaders.forEach((invader) =>
        squares[invaderPos + invader].classList.add("invader")
      );

      // draw the shooter
      squares[playerPos].classList.add("shooter");

      // move the shoooter along a line
      function moveShooter(e) {
        e.preventDefault();
        squares[playerPos].classList.remove("shooter");

        // console.log(e);

        switch (e.target) {
          case lBtn:
            if (playerPos % width !== 0) playerPos -= 1;
            break;
          case rBtn:
            if (playerPos % width < width - 1) playerPos += 1;
            break;
        }

        switch (e.keyCode) {
          case 37:
            if (playerPos % width !== 0) playerPos -= 1;
            break;
          case 39:
            if (playerPos % width < width - 1) playerPos += 1;
            break;
        }

        squares[playerPos].classList.add("shooter");
      }

      document.addEventListener("keydown", moveShooter);

      lBtn.addEventListener("touchstart", moveShooter);
      rBtn.addEventListener("touchstart", moveShooter);

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
          if (!invadersShot.includes(i)) {
            squares[alienInvaders[i]].classList.add("invader");
          }
        }

        // decide if game is over
        if (squares[playerPos].classList.contains("invader", "shooter")) {
          resultsDisplay.innerHTML = "GAME OVER";
          loser = 1;
          clearInterval(invadersId);
        }

        for (let i = 0; i < alienInvaders.length; i++) {
          if (alienInvaders[i] > squares.length) {
            resultsDisplay.innerHTML = "GAME OVER";
            loser = 1;
            clearInterval(invadersId);
          }
        }

        // decide if win game
        if (invadersShot.length === alienInvaders.length) {
          resultsDisplay.textContent = "You Win!";
          clearInterval(invadersId);
        }
      }
      invadersId = setInterval(moveInvaders, 600);

      //shoot at aliens
      function shoot(e) {
        e.preventDefault();
        let laserId;

        let currentLaserIndex = playerPos;

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
              invadersRemoved.push(alienRemoved);
              invadersShot.push(alienRemoved);
              result++;
              resultsDisplay.innerHTML = result;
            }
          }
        }
        if (loser !== 1) {
          switch (e.key) {
            case "ArrowUp":
              laserId = setInterval(moveLaser, 100);
              break;
          }
        }
        if (loser !== 1) {
          switch (e.target) {
            case fBtn:
              laserId = setInterval(moveLaser, 100);
          }
        }
      }

      fBtn.addEventListener("touchstart", shoot);

      document.addEventListener("keydown", shoot);
    }
  };
})();
