window.addEventListener('load', function () {
 
    document.querySelector('.switch-png').addEventListener('change', onChange_png);
    document.querySelector('.switch-4x4').addEventListener('change', onChange_4x4);
    document.querySelector('.switch-32x32').addEventListener('change', onChange_32x32);
    document.querySelector('.switch-4x4').dispatchEvent(new Event('change'));
});


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

function onChange_png() {
    const img = new Image();
    img.onload = function () {
        canvas.width = 256;
        canvas.height = 256;
        ctx.drawImage(img, 0, 0);
    }
    img.src = './data/image.png';
};


async function getArr(url) {
    try {
        const arr = await fetch(url);
        return arr;
    } catch (err) {
        console.log(err);
    }
}

const concat = (xs, ys) => xs.concat(ys);
const hexToRGBA = hexStr => [
    parseInt(hexStr.substr(0, 2), 16),
    parseInt(hexStr.substr(2, 2), 16),
    parseInt(hexStr.substr(4, 2), 16),
    255
];

function onChange_4x4() {
    getArr('./data/4x4.json')
        .then(response => response.json())
        .then(json => {
            draw(json);
        });

    let draw = function (arr) {
        const flattenedRGBAValues = arr.reduce(concat).map(hexToRGBA).reduce(concat);
        canvas.width = canvas.height = 4;
        const imgData = new ImageData(Uint8ClampedArray.from(flattenedRGBAValues), 4, 4);
        ctx.putImageData(imgData, 0, 0);
    }
}

function onChange_32x32() {
    getArr('./data/32x32.json')
        .then(response => response.json())
        .then(json => {
            draw(json);
        });

    let draw = function (arr) {
        const flattenedRGBAValues = arr.reduce(concat).reduce(concat);
        canvas.width = canvas.height = 32;
        const imgData = new ImageData(Uint8ClampedArray.from(flattenedRGBAValues), 32, 32);
        ctx.putImageData(imgData, 0, 0);
    }
}