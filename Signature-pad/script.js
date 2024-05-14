const canvas = document.querySelector("canvas");
const form = document.querySelector(".signature-pad-form");
const clearBtn = document.querySelector(".clear-btn");
const ctx = canvas.getContext("2d");
let writingMode = false;
let lastX = 0;
let lastY = 0;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const imageUrl = canvas.toDataURL();
  const image = document.createElement("img");
  image.src = imageUrl;
  image.height = canvas.height;
  image.width = canvas.width;
  image.style.display = "block";
  image.style.border = "1px solid black";
  image.style.marginTop = "10px"; // Add margin-top of 10px
  form.appendChild(image);
  clearPad();
});

const clearPad = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

clearBtn.addEventListener("click", (event) => {
  event.preventDefault();
  clearPad();
});

const getTargetPosition = (event) => {
  const rect = canvas.getBoundingClientRect();
  const positionX = event.clientX - rect.left;
  const positionY = event.clientY - rect.top;
  return [positionX, positionY];
};

const handlePointerMove = (event) => {
  if (!writingMode) return;

  const [positionX, positionY] = getTargetPosition(event);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(positionX, positionY);
  ctx.stroke();

  lastX = positionX;
  lastY = positionY;
};

const handlePointerUp = (event) => {
  writingMode = false;
};

const handlePointerDown = (event) => {
  writingMode = true;
  const [positionX, positionY] = getTargetPosition(event);
  lastX = positionX;
  lastY = positionY;
};

ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap = "round";

canvas.addEventListener("pointerdown", handlePointerDown);
canvas.addEventListener("pointermove", handlePointerMove);
canvas.addEventListener("pointerup", handlePointerUp);
