const gridSideLength = 500;
const sizeSlider = document.getElementById("sizeSlider");
const grid = document.getElementById("grid");

function createGrid() {
  const sideSize = getSideSize();

  clearGrid();
  for (let i = 0; i < sideSize; i++) {
    let gridElement = document.createElement("div");
    gridElement.className = "gridElement";
    grid.appendChild(gridElement);
  }
}

function clearGrid() {
  grid.innerHTML = "";
}

function getSideSize() {
  return sizeSlider.value;
}

sizeSlider.addEventListener("change", createGrid);
