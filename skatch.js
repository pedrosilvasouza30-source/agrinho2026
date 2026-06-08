// =======================
// ECO HEROES
// =======================

let gameState = "menu";

let player;
let trash = [];
let trees = [];
let enemies = [];

let score = 0;
let lives = 3;
let level = 1;
let timer = 60;

// =======================
// SETUP
// =======================

function setup() {

  createCanvas(1000, 700);

  textAlign(CENTER, CENTER);

  initializeGame();
}

function initializeGame() {

  player = {
    x: width / 2,
    y: height / 2,
    size: 35
  };

  score = 0;
  lives = 3;
  level = 1;
  timer = 60;

  createLevel();
}

function createLevel() {

  trash = [];
  trees = [];
  enemies = [];

  for (let i = 0; i < 8 + level * 2; i++) {

    trash.push({
      x: random(50, width - 50),
      y: random(150, height - 50),
      collected: false
    });
  }

  for (let i = 0; i < level + 2; i++) {

    trees.push({
      x: random(50, width - 50),
      y: random(150, height - 50),
      planted: false
    });
  }

  for (let i = 0; i < level; i++) {

    enemies.push({
      x: random(width),
      y: random(150, height),
      vx: random(-2, 2),
      vy: random(-2, 2)
    });
  }
}

// =======================
// DRAW
// =======================

function draw() {

  if (gameState === "menu") {

    drawMenu();

  } else if (gameState === "game") {

    drawGame();

  } else if (gameState === "win") {

    drawWin();

  } else if (gameState === "lose") {

    drawLose();
  }
}

// =======================
// MENU
// =======================

function drawMenu() {

  background(100, 200, 255);

  fill(255, 220, 0);
  circle(850, 100, 120);

  fill(50, 180, 70);
  rect(0, 500, width, 200);

  fill(0);

  textSize(60);
  text("🌎 ECO HEROES 🌳", width / 2, 150);

  textSize(24);
  text(
    "Colete lixo, plante árvores e salve o planeta!",
    width / 2,
    250
  );

  fill(50, 180, 80);
  rect(width / 2 - 150, 350, 300, 80, 20);

  fill(255);
  textSize(40);
  text("JOGAR", width / 2, 390);

  textSize(20);
  fill(0);

  text(
    "Clique no botão ou pressione ENTER",
    width / 2,
    500
  );
}

// =======================
// GAME
// =======================

function drawGame() {

  drawWorld();

  movePlayer();

  drawTrash();

  drawTrees();

  drawEnemies();

  drawPlayer();

  drawHUD();

  checkLevel();
}

// =======================
// MUNDO
// =======================

function drawWorld() {

  background(135, 206, 235);

  fill(60, 180, 75);
  rect(0, 120, width, height);

  fill(255, 220, 0);
  circle(900, 100, 80);

  for (let i = 0; i < width; i += 180) {

    drawDecorationTree(i + 40, 180);
  }
}

// =======================
// JOGADOR
// =======================

function drawPlayer() {

  fill(0, 100, 255);

  circle(
    player.x,
    player.y,
    player.size
  );

  fill(255);

  textSize(18);

  text(
    "🙂",
    player.x,
    player.y
  );
}

function movePlayer() {

  let speed = 5;

  if (keyIsDown(65) || keyIsDown(LEFT_ARROW))
    player.x -= speed;

  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW))
    player.x += speed;

  if (keyIsDown(87) || keyIsDown(UP_ARROW))
    player.y -= speed;

  if (keyIsDown(83) || keyIsDown(DOWN_ARROW))
    player.y += speed;

  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 120, height);
}

// =======================
// LIXO
// =======================

function drawTrash() {

  textSize(30);

  for (let t of trash) {

    if (!t.collected) {

      text("🗑️", t.x, t.y);

      if (
        dist(
          player.x,
          player.y,
          t.x,
          t.y
        ) < 25
      ) {

        t.collected = true;
        score += 10;
      }
    }
  }
}

// =======================
// ÁRVORES
// =======================

function drawTrees() {

  textSize(30);

  for (let t of trees) {

    if (!t.planted) {

      text("🌱", t.x, t.y);

      if (
        dist(
          player.x,
          player.y,
          t.x,
          t.y
        ) < 25
      ) {

        t.planted = true;
        score += 20;
      }

    } else {

      text("🌳", t.x, t.y);
    }
  }
}

// =======================
// INIMIGOS
// =======================

function drawEnemies() {

  textSize(35);

  for (let e of enemies) {

    e.x += e.vx;
    e.y += e.vy;

    if (e.x < 0 || e.x > width)
      e.vx *= -1;

    if (e.y < 120 || e.y > height)
      e.vy *= -1;

    text("🏭", e.x, e.y);

    if (
      dist(
        player.x,
        player.y,
        e.x,
        e.y
      ) < 35
    ) {

      lives--;

      player.x = width / 2;
      player.y = height / 2;

      if (lives <= 0) {

        gameState = "lose";
      }
    }
  }
}

// =======================
// HUD
// =======================

function drawHUD() {

  fill(0);

  textAlign(LEFT);

  textSize(24);

  text("⭐ " + score, 20, 35);
  text("❤️ " + lives, 20, 70);
  text("📈 Nível " + level, 20, 105);

  textAlign(CENTER);
}

// =======================
// NÍVEIS
// =======================

function checkLevel() {

  let allTrash =
    trash.every(t => t.collected);

  let allTrees =
    trees.every(t => t.planted);

  if (allTrash && allTrees) {

    level++;

    if (level > 5) {

      gameState = "win";

    } else {

      createLevel();
    }
  }
}

// =======================
// VITÓRIA
// =======================

function drawWin() {

  background(100, 255, 120);

  fill(0);

  textSize(60);

  text(
    "🏆 PLANETA SALVO! 🏆",
    width / 2,
    250
  );

  textSize(35);

  text(
    "Pontuação: " + score,
    width / 2,
    350
  );

  textSize(25);

  text(
    "Pressione R para jogar novamente",
    width / 2,
    450
  );
}

// =======================
// DERROTA
// =======================

function drawLose() {

  background(255, 120, 120);

  fill(0);

  textSize(60);

  text(
    "💀 GAME OVER 💀",
    width / 2,
    250
  );

  textSize(35);

  text(
    "Pontuação: " + score,
    width / 2,
    350
  );

  textSize(25);

  text(
    "Pressione R para tentar novamente",
    width / 2,
    450
  );
}

// =======================
// DECORAÇÃO
// =======================

function drawDecorationTree(x, y) {

  fill(120, 70, 20);
  rect(x - 10, y, 20, 50);

  fill(30, 150, 30);
  circle(x, y - 20, 60);
}

// =======================
// CONTROLES
// =======================

function keyPressed() {

  if (
    gameState === "menu" &&
    keyCode === ENTER
  ) {

    gameState = "game";
  }

  if (
    (gameState === "win" ||
      gameState === "lose") &&
    (key === "r" || key === "R")
  ) {

    initializeGame();

    gameState = "game";
  }
}

function mousePressed() {

  if (gameState === "menu") {

    if (
      mouseX > width / 2 - 150 &&
      mouseX < width / 2 + 150 &&
      mouseY > 350 &&
      mouseY < 430
    ) {

      gameState = "game";
    }
  }
}
