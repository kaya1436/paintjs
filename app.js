const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

//캔버스 크기 설정
canvas.width = 700;
canvas.height = 500;

//stroke = 선, fill = 면
//기본 설정: 배경 = 흰색,  브러쉬 = 검은색 2.5굵기
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX; //마우스 좌표
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y); //마우스 시작
  } else {
    ctx.lineTo(x, y); //마우스 시작지점-끝지점 선 그리기
    ctx.stroke();
  }
}

//색상 변경
function handleColorClick(event) {
  const color = event.target.style.backgroundColor; //color = 배경색상
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

//선 굵기 변경
function handleRangeChange(event) {
  const size = event.target.value; //size = range값
  ctx.lineWidth = size;
}

//색상 채우기
function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height); //0부터 캔버스 크기만큼 채우기
  }
}

//오른쪽 클릭 막음
function handleCM(event) {
  event.preventDefault();
}

//이미지 저장 버튼
function handleSaveClick(event) {
  const image = canvas.toDataURL(); //이미지 주소
  const link = document.createElement("a"); //<a>태그 생성
  link.href = image;
  link.download = "PaintJS[🎨]"; //이미지 저장 이름
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting); //마우스 드래그 시작
  canvas.addEventListener("mouseup", stopPainting); //마우스 드래그 끝
  canvas.addEventListener("mouseleave", stopPainting); //마우스가 캔버스 벗어날 때
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
