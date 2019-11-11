import canvas4x4 from '../../data/4x4';
import canvas32x32 from '../../data/32x32';
/* import picture from '../../data/image.png' */
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

class Canvas {
  static _dom;

  static _canvas = this.dom.window.document.getElementById('canvas');

  static _ctx = this.canvas.getContext('2d');

  static _concat = (xs, ys) => xs.concat(ys);

  static _hexToRGBA = (hexStr) => [
    parseInt(hexStr.substr(0, 2), 16),
    parseInt(hexStr.substr(2, 2), 16),
    parseInt(hexStr.substr(4, 2), 16),
    255,
  ];

  /*   static async getArr(url) {
    try {
      const arr = await fetch(url);
      return arr;
    } catch (err) {
      console.log(err);
    }
  } */

  static async initial() {
    this.dom = await JSDOM.fromFile('../../index.html', {
      resources: 'usable',
      runScripts: 'dangerously',
    });

    const switchPanel = this.dom.window.document
      .querySelector('.switch_panel');

    /*     switchPanel
      .querySelector('.switchPng')
      .addEventListener('change', this.onChangePng); */
    switchPanel
      .querySelector('.switch4x4')
      .addEventListener('change', this.onChange4x4);
    switchPanel
      .querySelector('.switch32x32')
      .addEventListener('change', this.onChange32x32);
    switchPanel.querySelector('.switch4x4')
      .dispatchEvent(new this.dom.window.Event('change'));
  }

  /*   static onChangePng = () => {
    const img = new this.dom.window.Image();
    img.onload = () => {
      this.canvas.width = 256;
      this.canvas.height = 256;
      this.ctx.drawImage(img, 0, 0);
    };
    img.src = './data/image.png';
  }; */

  static onChange4x4 = () => {
    const flattenedRGBAValues = canvas4x4
      .reduce(this.canvas)
      .map(this.hexToRGBA)
      .reduce(this.canvas);
    [this.canvas.width, this.canvas.height] = [4, 4];
    const imgData = new this.dom.window.ImageData(
      Uint8ClampedArray.from(flattenedRGBAValues),
      4,
      4,
    );
    this.ctx.putImageData(imgData, 0, 0);
  };

  static onChange32x32 = () => {
    const flattenedRGBAValues = canvas32x32
      .reduce(this.canvas).reduce(this.canvas);
    [this.canvas.width, this.canvas.height] = [32, 32];
    const imgData = new this.dom.window.ImageData(
      Uint8ClampedArray.from(flattenedRGBAValues),
      32,
      32,
    );
    this.ctx.putImageData(imgData, 0, 0);
  };
}

export default {
  Canvas,
};

/* export default 'Canvas'; */
