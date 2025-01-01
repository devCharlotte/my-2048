const gameContainer = document.getElementById('game-container');
const resetButton = document.getElementById('reset-button');
const controlButtons = document.querySelectorAll('.control-btn');
const gridSize = 4; // 4x4 그리드
let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));

// 초기화 함수
function initializeGame() {
  grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0)); // 새로운 게임판 초기화
  addRandomTile();
  addRandomTile();
  renderGrid();
}

// 랜덤 위치에 새로운 타일 추가
function addRandomTile() {
  let emptyTiles = [];
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === 0) {
        emptyTiles.push({ r, c });
      }
    }
  }
  if (emptyTiles.length === 0) return;

  let { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  grid[r][c] = Math.random() > 0.1 ? 2 : 4;
}

// 그리드 렌더링
function renderGrid() {
  gameContainer.innerHTML = ''; // 기존 타일 초기화
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const tile = document.createElement('div');
      tile.classList.add('grid');
      if (grid[r][c] !== 0) {
        tile.classList.add(`tile-${grid[r][c]}`);
        tile.textContent = grid[r][c];
      }
      gameContainer.appendChild(tile);
    }
  }
}

// 방향 버튼 처리
function handleButtonClick(direction) {
  switch (direction) {
    case 'up':
      moveUp();
      break;
    case 'down':
      moveDown();
      break;
    case 'left':
      moveLeft();
      break;
    case 'right':
      moveRight();
      break;
  }
  addRandomTile();
  renderGrid();
}

// 좌/우/상/하 이동 로직
function moveLeft() {
  for (let r = 0; r < gridSize; r++) {
    let row = grid[r].filter(val => val !== 0);
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
      }
    }
    grid[r] = [...row.filter(val => val !== 0), ...Array(gridSize - row.filter(val => val !== 0).length).fill(0)];
  }
}

function moveRight() {
  for (let r = 0; r < gridSize; r++) {
    let row = grid[r].filter(val => val !== 0);
    for (let i = row.length - 1; i > 0; i--) {
      if (row[i] === row[i - 1]) {
        row[i] *= 2;
        row[i - 1] = 0;
      }
    }
    grid[r] = [...Array(gridSize - row.filter(val => val !== 0).length).fill(0), ...row.filter(val => val !== 0)];
  }
}

function moveUp() {
  for (let c = 0; c < gridSize; c++) {
    let column = [];
    for (let r = 0; r < gridSize; r++) {
      if (grid[r][c] !== 0) column.push(grid[r][c]);
    }
    for (let i = 0; i < column.length - 1; i++) {
      if (column[i] === column[i + 1]) {
        column[i] *= 2;
        column[i + 1] = 0;
      }
    }
    column = column.filter(val => val !== 0);
    for (let r = 0; r < gridSize; r++) {
      grid[r][c] = column[r] || 0;
    }
  }
}

function moveDown() {
  for (let c = 0; c < gridSize; c++) {
    let column = [];
    for (let r = 0; r < gridSize; r++) {
      if (grid[r][c] !== 0) column.push(grid[r][c]);
    }
    for (let i = column.length - 1; i > 0; i--) {
      if (column[i] === column[i - 1]) {
        column[i] *= 2;
        column[i - 1] = 0;
      }
    }
    column = column.filter(val => val !== 0);
    for (let r = 0; r < gridSize; r++) {
      grid[gridSize - r - 1][c] = column[column.length - r - 1] || 0;
    }
  }
}

// 이벤트 리스너 추가
resetButton.addEventListener('click', initializeGame);

controlButtons.forEach(button => {
  button.addEventListener('click', () => {
    handleButtonClick(button.dataset.direction);
  });
});

// 게임 초기화
initializeGame();
