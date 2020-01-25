/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-globals */
/* eslint-disable func-names */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
const filterGrayElement = document.getElementById('filterGray');
const canvas = document.getElementById('canvas'); // document.querySelector('#canvas')
const ctx = canvas.getContext('2d');
let currentColor = 'green';

const loadImageButton = document.getElementById('load-image-button');
const imageKeywordsInput = document.querySelector('#image-keywords-input');

window.onload = async function () {
  const save = localStorage.getItem('save');
  const image = new Image(60, 45);
  image.src = save;
  await image.decode();
  ctx.drawImage(image, 0, 0);
};

loadImageButton.onclick = async function (downloadImage) {
  const image = new Image(60, 45);
  const keyword = imageKeywordsInput.value === '' ? 'Minsk' : imageKeywordsInput.value;
  image.src = `https://source.unsplash.com/512x512/?city,${keyword}`;
  image.crossOrigin = 'Anonymous';
  await image.decode();
  ctx.drawImage(image, 0, 0);
};

function filterChangeHandler() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const average = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    imageData.data[i] = average;
    imageData.data[i + 1] = average;
    imageData.data[i + 2] = average;
  }

  ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
}

filterGrayElement.addEventListener('click', () => {
  filterChangeHandler();
});


document.getElementById('colorpicker').addEventListener('change', function () {
  currentColor = this.value;
});
document.getElementById('bgcolorpicker').addEventListener('change', function () {
  ctx.fillStyle = this.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  currentBg = ctx.fillStyle;
});
// document.getElementById('pencil').addEventListener('change', function () {
// });
// document.getElementById("pencil").onclick = doFunction;
// document.getElementById("pencil").onclick = function () { alert('hello!');
// var el = document.getElementById("pencil");
// if (el.addEventListener)
//    el.addEventListener("click", doFunction, false);
// else if (el.attachEvent)
//  el.attachEvent('onclick', doFunction);

function kp(e) {
  if (e) keyCode = e.which;
  else if (event) keyCode = event.keyCode;
  else return;
  if (keyCode == 66) document.getElementById('bgcolorpicker').click();
  // eslint-disable-next-line eqeqeq
  if (keyCode == 67) document.getElementById('colorpicker').click();
  if (keyCode == 80) document.getElementById('pencil').click();
}
document.onkeypress = kp;

canvas.onmousedown = function (event) {
  // eslint-disable-next-line no-shadow
  canvas.onmousemove = function (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.fillRect(x - 5, y - 5, 4, 4);
    ctx.fillStyle = currentColor;
    ctx.fill();
  };
  canvas.onmouseup = function () {
    localStorage.removeItem('save');
    localStorage.setItem('save', canvas.toDataURL());
    canvas.onmousemove = null;
  };
};
