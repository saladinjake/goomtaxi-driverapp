// /**
//  * Theme: Ubold Admin Template
//  * Author: Coderthemes
//  * Google Maps
//  */

// !(function($) {
//   'use strict';

//   var GoogleMap = function() {};

//     //Type
//     (GoogleMap.prototype.createMapByType = function($container, $lat, $lng) {
//       var map = new GMaps({
//         div: $container,
//         lat: $lat,
//         lng: $lng,
//         mapTypeControlOptions: {
//           mapTypeIds: ['hybrid', 'roadmap', 'satellite', 'terrain', 'osm', 'cloudmade'],
//         },
//       });
//       map.addMapType('osm', {
//         getTileUrl: function(coord, zoom) {
//           return 'http://tile.openstreetmap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
//         },
//         tileSize: new google.maps.Size(256, 256),
//         name: 'OpenStreetMap',
//         maxZoom: 18,
//       });
//       map.addMapType('cloudmade', {
//         getTileUrl: function(coord, zoom) {
//           return (
//             'http://b.tile.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/1/256/' +
//             zoom +
//             '/' +
//             coord.x +
//             '/' +
//             coord.y +
//             '.png'
//           );
//         },
//         tileSize: new google.maps.Size(256, 256),
//         name: 'CloudMade',
//         maxZoom: 18,
//       });
//       map.setMapTypeId('osm');
//       return map;
//     }),
//     //init
//     (GoogleMap.prototype.init = function() {
//       var $this = this;
//       $(document).ready(function() {
       
//         //types
//         $this.createMapByType('#gmaps-types', 6.5244, 3.3792);

//         //statu
       
//       });
//     }),
//     //init
//     ($.GoogleMap = new GoogleMap()),
//     ($.GoogleMap.Constructor = GoogleMap);
// })(window.jQuery),
//   //initializing
//   (function($) {
//     'use strict';
//     $.GoogleMap.init();
//   })(window.jQuery);