const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let running = false;
let map;
let intervalId;
const gridSize = 200;
const blockSize = canvas.width / gridSize;
let ants;
const dir = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

function start(count) {
  stop();
  ctx.fillStyle = "#202124";
  ctx.fillRect(0, 0, canvas.height, canvas.width);
  init(count);
}

function init(count) {
  if (running) return;

  running = true;
  map = makeMap(gridSize, 0);

  ants = makeAnt(count);
  console.log(ants);

  draw();

  /*
  for (let i = 0; i < 11000; i++) {
    try {
      ants.forEach((ant) => {
        gameLoop(ant);
      });
    } catch (err) {
      stop();
      console.error(err);
    }
  }
*/
  draw();
  gameInterval();
}

function gameInterval() {
  intervalId = setInterval(() => {
    try {
      ants.forEach((ant) => {
        gameLoop(ant);
      });
    } catch (err) {
      stop();
      console.error(err);
    }
  }, 10);
}

function gameLoop(ant) {
  if (map[ant.x][ant.y]) {
    //black
    ctx.fillStyle = "#202124";
    map[ant.x][ant.y] = 0;

    //turn right
    ant.dir++;
    if (ant.dir > 3) ant.dir = 0;
  } else {
    //white
    ctx.fillStyle = "#bbb";
    map[ant.x][ant.y] = 1;

    //turn left
    ant.dir--;
    if (ant.dir < 0) ant.dir = 3;
  }

  //draw the change
  ctx.fillRect(ant.x * blockSize, ant.y * blockSize, blockSize, blockSize);

  //moving the ant;
  ant.x += dir[ant.dir].x;
  ant.y += dir[ant.dir].y;

  ctx.fillStyle = "red";
  ctx.fillRect(ant.x * blockSize, ant.y * blockSize, blockSize, blockSize);
}

//draw the whole
function draw() {
  ctx.fillStyle = "#202124";
  ctx.fillRect(0, 0, canvas.height, canvas.width);

  ctx.fillStyle = "#bbb";

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (map[x][y])
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    }
  }
}

function makeMap(size, def) {
  let arr = new Array(size);

  for (let i = 0; i < size; i++) {
    arr[i] = Array(size).fill(def);
  }

  return arr;
}

function makeAnt(count) {
  let arr = new Array(count);

  const max = gridSize - 40;
  const min = 40;

  //looping
  for (let i = 0; i < count; i++) {
    arr[i] = {
      x: Math.floor(Math.random() * (max - min) + min),
      y: Math.floor(Math.random() * (max - min) + min),
      dir: 0,
    };
  }
  return arr;
}

function stop() {
  running = false;
  clearInterval(intervalId);
  console.log("end");
}
