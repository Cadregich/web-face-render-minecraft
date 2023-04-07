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

function faceRender(ctx, canvas) {
    const image = new Image();
    image.src = "skins/128x128.png?t=" + new Date().getTime();

    image.onload = function () {
        const skinWidth = this.width;
        const skinHeight = this.height;

        if ((skinHeight !== 32 && skinHeight !== 64 && skinHeight !== 128 && skinHeight !== 256 && skinHeight !== 512) ||
            (skinWidth !== 64 && skinWidth !== 128 && skinWidth !== 256 && skinWidth !== 512)) {
            console.error('Face Render: Invalid skin size');
            return;
        }

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        if (canvasWidth < 64 || canvasHeight < 64) {
            console.warn('Face Render: Low canvas size');
        }

        if (canvasWidth !== canvasHeight) {
            console.warn('Face Render: The width of the canvas is not equal to its height');
        }

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
    }
}

function capeRender(ctx, canvas) {
    const image = new Image();
    image.src = "skins/hd_cape.png?t=" + new Date().getTime();
    image.onload = function () {
        const capeWidth = this.width;
        const capeHeight = this.height;

        if ((capeWidth !== 64 && capeWidth !== 128 && capeWidth !== 256 && capeWidth !== 512 && capeWidth !== 1024) ||
            (capeHeight !== 32 && capeHeight !== 64 && capeHeight !== 128 && capeHeight !== 256 && capeHeight !== 512 && capeHeight !== 1024)) {
            console.error('Face Render: Invalid cape size');
        }

        const croppedArea = {
            width: 12,
            height: 8,
        };

        if (capeWidth === 128) {
            for (let key in croppedArea) {
                croppedArea[key] *= 2;
            }
        } else if (capeWidth === 256) {
            for (let key in croppedArea) {
                croppedArea[key] *= 4;
            }
        } else if (capeWidth === 512) {
            for (let key in croppedArea) {
                croppedArea[key] *= 8;
            }
        } else if (capeWidth === 1024) {
            for (let key in croppedArea) {
                croppedArea[key] *= 16;
            }
        }

        // Cape
        ctx.drawImage(
            image,
            0,
            5,
            croppedArea['width'],
            croppedArea['height'],
            0,
            0,
            canvas.width,
            canvas.height
        );
    }
}

function initialize() {
    const canvasElements = document.querySelectorAll(".skinHead");

    canvasElements.forEach((canvas) => {
        const imageType = canvas.getAttribute('type');
        const ctx = canvas.getContext("2d");
        removeBlurFromCanvas(canvas, ctx);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (imageType !== 'cape') {
            faceRender(ctx, canvas);
        } else {
            capeRender(ctx, canvas);
        }
    });
}
initialize();
