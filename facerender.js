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

removeBlurFromCanvas(canvas, ctx);

const image = new Image();
image.src = "img/hatsune_miku.png";

image.onload = function () {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imageWidth = canvasWidth - (canvasWidth * (8 / 100));
    const imageHeight = canvasHeight - (canvasHeight * (8 / 100));
    const canvasDX = (canvasWidth - imageWidth) / 2;
    const canvasDY = (canvasHeight - imageHeight) / 2;
    ctx.drawImage(
        image,
        8,
        8,
        8,
        8,
        canvasDX,
        canvasDY,
        imageWidth,
        imageHeight
    );
    ctx.drawImage(
        image,
        40,
        8,
        8,
        8,
        0,
        0,
        canvasWidth,
        canvasHeight
    );
};
