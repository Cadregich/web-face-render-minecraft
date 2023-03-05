/*
*  Minecraft 2d head render
*  Author: Cadregich
*  Contact: thekeykeyloy@gmail.com | Discord: Cadregich#5412
*/

function removeBlurFromCanvas(canvas, ctx) {
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    canvas.style.imageRendering = "optimizeSpeed";
    canvas.style.imageRendering = "-moz-crisp-edges";
    canvas.style.imageRendering = "-o-crisp-edges";
    canvas.style.imageRendering = "pixelated";
    canvas.style.msInterpolationMode = "nearest-neighbor";
}

const canvas = document.getElementById("skinHead");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "img/128x128.png";

image.onload = function () {
//  console.log("Ширина изображения: " + this.width + "px");
//  console.log("Высота изображения: " + this.height + "px");
    const skinWidth = this.width;
    const skinHeight = this.height;

    if ((skinHeight !== 64 && skinHeight !== 128 && skinHeight !== 256 && skinHeight !== 512) ||
        (skinWidth !== 64 && skinWidth !== 128 && skinWidth !== 256 && skinWidth !== 512)) {
        console.error('Face Render: Invalid skin size');
        return;
    }

    removeBlurFromCanvas(canvas, ctx);

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imageWidth = canvasWidth - (canvasWidth * (8 / 100));    // To reduce the first layer so that the second is in front
    const imageHeight = canvasHeight - (canvasHeight * (8 / 100)); // To reduce the first layer so that the second is in front
    const canvasDX = (canvasWidth - imageWidth) / 2;   // To center the first layer
    const canvasDY = (canvasHeight - imageHeight) / 2; // To center the first layer

    const indentsAndSize = {
        FirstLayer: 8,
        SecondLayer: 8,
        indentXSecondLayer: 40
    };

    if (skinWidth === 128) {
        for (let key in indentsAndSize) {
            indentsAndSize[key] *= 2;
        }
    } else if (skinWidth === 256) {
        for (let key in indentsAndSize) {
            indentsAndSize[key] *= 4;
        }
    } else if (skinWidth === 512) {
        for (let key in indentsAndSize) {
            indentsAndSize[key] *= 8;
        }
    }
    // First layer
    ctx.drawImage(
        image,
        indentsAndSize["FirstLayer"],
        indentsAndSize["FirstLayer"],
        indentsAndSize["FirstLayer"],
        indentsAndSize["FirstLayer"],
        canvasDX,
        canvasDY,
        imageWidth,
        imageHeight
    );
    // Second layer
    ctx.drawImage(
        image,
        indentsAndSize["indentXSecondLayer"],
        indentsAndSize["SecondLayer"],
        indentsAndSize["SecondLayer"],
        indentsAndSize["SecondLayer"],
        0,
        0,
        canvasWidth,
        canvasHeight
    );
};
