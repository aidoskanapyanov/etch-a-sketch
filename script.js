const gridSideLength = 500;
const sizeSlider = document.getElementById("sizeSlider");
const grid = document.getElementById("grid");

function createGrid() {
  const sideSize = getSideSize();

  console.log(sideSize);
}

function getSideSize() {
  return sizeSlider.value;
}

sizeSlider.addEventListener("change", createGrid);
