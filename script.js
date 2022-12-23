const gridSideLength = 500;
const sizeSlider = document.getElementById("sizeSlider");
const grid = document.getElementById("grid");
const clearBtn = document.getElementById("clearBtn");
const predictBtn = document.getElementById("predictBtn");
const eraserBtn = document.getElementById("eraserBtn");
const colorBtn = document.getElementById("colorBtn");

let eraserIsOn = false;
let colorModeIsOn = true;
colorBtn.classList.add("active");

function toggleEraser() {
  if (!eraserIsOn) {
    eraserIsOn = !eraserIsOn;
    colorModeIsOn = false;
    colorBtn.classList.remove("active");
    eraserBtn.classList.add("active");
  }
}

function toggleColorMode() {
  if (!colorModeIsOn) {
    colorModeIsOn = !colorModeIsOn;
    eraserIsOn = false;
    eraserBtn.classList.remove("active");
    colorBtn.classList.add("active");
  }
}

function makeBlack(event) {
  if (event.buttons == 1 || event.buttons == 3) {
    event.target.classList.add("colored");
  }
}

function removeBlack(event) {
  if (event.buttons == 1 || event.buttons == 3) {
    event.target.classList.remove("colored");
  }
}

function changeColor(event) {
  if (eraserIsOn) {
    removeBlack(event);
    removeBlackTouchEvent(event);
  } else {
    makeBlack(event);
    makeBlackTouchEvent(event);
  }
}

function makeBlackTouchEvent(e) {
  if (e.type == "touchmove") {
    e.preventDefault();
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;

    const el = document.elementFromPoint(clientX, clientY);
    el.classList.add("colored");
  }
}

function removeBlackTouchEvent(e) {
  if (e.type == "touchmove") {
    e.preventDefault();
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;

    const el = document.elementFromPoint(clientX, clientY);
    el.classList.remove("colored");
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
    gridElement.addEventListener("mouseover", changeColor);
    gridElement.addEventListener("mousedown", changeColor);
    gridElement.addEventListener("touchmove", changeColor);

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
  const IMAGE_WIDTH = +getSideSize();
  const IMAGE_HEIGHT = +getSideSize();
  const gridMatrix = Array.from(document.getElementsByClassName("gridElement")).map((el) => {
    return +el.classList.contains("colored");
  });

  return tf.tensor([gridMatrix]).reshape([1, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
}

function resizeInputTo28By28(unpredicted) {
  return tf.image.resizeBilinear(unpredicted, [28, 28]);
}

async function makePrediction() {
  const model = await tf.loadLayersModel("./model/my-model.json");
  const unpredicted = resizeInputTo28By28(getUnpredicted());
  const prediction = model.predict(unpredicted).argMax(-1);

  alert(`The number is recognized as: ${prediction.dataSync()[0]}`);
}

createGrid();
sizeSlider.addEventListener("input", createGrid);
clearBtn.addEventListener("click", createGrid);
predictBtn.addEventListener("click", makePrediction);
eraserBtn.addEventListener("click", toggleEraser);
colorBtn.addEventListener("click", toggleColorMode);
