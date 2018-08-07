/**
 * loadImage load a image with a promise structure
 * @param url
 * @return {Promise<any>}
 */
function loadImage(url) {
  return new Promise(function (resolve, reject) {
    var img = document.createElement('img');
    img.onload = function () {
      resolve(this);
    };

    img.onerror = function (e) {
      reject(e);
    };

    img.src = url;
  });
}

/**
 * Animate a element to a position
 * @param {HTMLElement} element
 * @param {number} duration
 * @param {number} x
 * @param {number} y
 * @return {Promise<any>}
 */
function animate(element, duration, x, y) {
  return new Promise(function (resolve) {
    TweenLite.to(element, duration, { x: x, y: y, onComplete: resolve });
  });
}

var images = [
  './assets/001-yawn.png',
  './assets/002-wink.png',
  './assets/003-smile-1.png',
  './assets/004-smile.png',
  './assets/005-surprise.png',
  './assets/006-shocked.png',
  './assets/007-sceptic.png',
  './assets/008-sad-2.png',
  './assets/009-sad-1.png',
  './assets/010-happy-3.png',
  './assets/011-pain.png',
  './assets/012-muted.png',
  './assets/013-meh.png',
  './assets/014-laugh.png',
  './assets/015-ill.png',
  './assets/016-happy-2.png',
  './assets/017-happy-1.png',
  './assets/018-cute.png',
  './assets/019-crying.png',
  './assets/020-crazy.png',
  './assets/021-cool.png',
  './assets/022-bored.png',
  './assets/023-blush.png',
  './assets/024-sad.png',
  './assets/025-happy.png',
];

/// WRITE CODE UNDER HERE

const coords = [
  {x: 1, y: 0},
  {x: 1, y: 1},
  {x: 0, y: 1},
  {x: 0, y: 0},
];

const SQUARE_SIDE = 200;

/**
 * Helper function that can chain promises sequentially
 * @param list An array of items to iterate over sequentially
 * @param cb A callback function that receives the item in the list, and must return a promise
 * @return A promise, for when the complete list is done
 */
function chainPromises(list, cb) {
  return list.reduce((prev, item) =>
      prev.then(() => cb(item)),
    Promise.resolve());
}

function animateImage(img) {
  document.body.appendChild(img);
  return chainPromises(coords, coord => animate(img, 0.05, coord.x * SQUARE_SIDE, coord.y * SQUARE_SIDE));
}

Promise.all(
  images.map(loadImage)).then(images => chainPromises(images, animateImage)
).then(() => {
  console.log('all done');
});
