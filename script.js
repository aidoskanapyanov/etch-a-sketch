const gridSideLength = 500;
const sizeSlider = document.getElementById("sizeSlider");
const grid = document.getElementById("grid");
const clearBtn = document.getElementById("clearBtn");

function makeBlack(event) {
  if (event.buttons == 1 || event.buttons == 3) {
    event.target.style.backgroundColor = "black";
  }
}

function createGrid() {
  const sideSize = getSideSize();

  clearGrid();
  for (let i = 0; i < sideSize * sideSize; i++) {
    let gridElement = document.createElement("div");
    gridElement.className = "gridElement";
    gridElement.addEventListener("mouseover", makeBlack);
    grid.appendChild(gridElement);
  }

  grid.style.gridTemplateColumns = `repeat(${sideSize}, minmax(1px, 1fr))`;
  grid.style.gridTemplateRows = `repeat(${sideSize}, minmax(1px, 1fr))`;
}

function clearGrid() {
  grid.innerHTML = "";
}

function getSideSize() {
  return sizeSlider.value;
}

createGrid();
sizeSlider.addEventListener("input", createGrid);
clearBtn.addEventListener("click", createGrid);
