const gridSideLength = 500;
const sizeSlider = document.getElementById("sizeSlider");
const grid = document.getElementById("grid");
const clearBtn = document.getElementById("clearBtn");
const predictBtn = document.getElementById("predictBtn");

function makeBlack(event) {
  if (event.buttons == 1 || event.buttons == 3) {
    event.target.classList.add("colored");
  }
}

function createGrid() {
  const sideSize = getSideSize();

  clearGrid();
  for (let i = 0; i < sideSize * sideSize; i++) {
    let gridElement = document.createElement("div");
    gridElement.className = "gridElement";
    gridElement.ondragstart = () => {
      return false;
    };
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

function getUnpredicted() {
  const IMAGE_WIDTH = 28;
  const IMAGE_HEIGHT = 28;
  const gridMatrix = Array.from(document.getElementsByClassName("gridElement")).map((el) => {
    return +el.classList.contains("colored");
  });

  return tf.tensor([gridMatrix]).reshape([1, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
}

async function makePrediction() {
  const model = await tf.loadLayersModel("./model/my-model.json");
  const unpredicted = getUnpredicted();
  const prediction = model.predict(unpredicted).argMax(-1);

  console.log(prediction.dataSync()[0]);
}

createGrid();
sizeSlider.addEventListener("input", createGrid);
clearBtn.addEventListener("click", createGrid);
predictBtn.addEventListener("click", makePrediction);
