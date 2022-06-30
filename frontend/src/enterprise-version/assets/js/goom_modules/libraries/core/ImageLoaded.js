'use strict';
class ImageLoaded {
  constructor() {}
  attachEvents(mainCallback) {
    window.addEventListener('load', function() {
      // let imgs = [
      //   'http://localhost:4000/UI/images/a.jpg',
      //   'http://localhost:4000/UI/images/b.jpg',
      //   'http://localhost:4000/UI/images/c.jpg',
      //   'http://localhost:4000/UI/images/d.jpg',
      //   'http://localhost:4000/UI/images/e.jpg',
      //   'http://localhost:4000/UI/images/f.jpg',
      //   'http://localhost:4000/UI/images/g.jpg',
      //   'http://localhost:4000/UI/images/h.jpg',
      //   'http://localhost:4000/UI/images/i.jpg',
      //   'http://localhost:4000/UI/images/j.jpg',
      // ];
      // ImageLoaded.loadImages(imgs, function() {
      //   //alert( "Complete!" );
      //   //do something like hide animations
      // });
    });

    mainCallback();
  }

  static loadImages(images, callback) {
    let total = images.length,
      count = 0,
      i;

    for (i = 0; i < total; ++i) {
      let src = images[i];
      let img = document.createElement('img');
      img.src = src;

      img.addEventListener('load', function() {
        if (this.complete) {
          count++;
          ImageLoaded.check(count, total, callback);
        }
      });
    }
  }

  static check(n, total, callback) {
    if (n == total) {
      callback();
    }
  }
}

export default ImageLoaded;
