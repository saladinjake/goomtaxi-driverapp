'use strict';

(function() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateProductKey() {
    let tokens = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      chars = 5,
      segments = 4,
      keyString = 'PLANID-';

    for (let i = 0; i < segments; i++) {
      let segment = '';

      for (let j = 0; j < chars; j++) {
        let k = getRandomInt(0, 35);
        segment += tokens[k];
      }

      keyString += segment;

      if (i < segments - 1) {
        keyString += '-';
      }
    }

    return keyString;
  }

  document.addEventListener('DOMContentLoaded', function() {
    let generate = document.querySelector('#generate'),
      output = document.querySelector('#output');

    generate.addEventListener(
      'click',
      function() {
        let productKey = generateProductKey();
        output.innerHTML = productKey;
      },
      false,
    );
  });
})();
