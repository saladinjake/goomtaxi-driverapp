import getApiUrl from '../../backend/services/apiservices/helpers/getOnlineUrlConnection';
let baseUrl = getApiUrl();

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ' '; //+ strTime;
}

var sortBy = (function() {
  var toString = Object.prototype.toString,
    // default parser function
    parse = function(x) {
      return x;
    },
    // gets the item to be sorted
    getItem = function(x) {
      var isObject = x != null && typeof x === 'object';
      var isProp = isObject && this.prop in x;
      return this.parser(isProp ? x[this.prop] : x);
    };

  /**
   * Sorts an array of elements.
   *
   * @param  {Array} array: the collection to sort
   * @param  {Object} cfg: the configuration options
   * @property {String}   cfg.prop: property name (if it is an Array of objects)
   * @property {Boolean}  cfg.desc: determines whether the sort is descending
   * @property {Function} cfg.parser: function to parse the items to expected type
   * @return {Array}
   */
  return function sortby(array, cfg) {
    if (!(array instanceof Array && array.length)) return [];
    if (toString.call(cfg) !== '[object Object]') cfg = {};
    if (typeof cfg.parser !== 'function') cfg.parser = parse;
    cfg.desc = !!cfg.desc ? -1 : 1;
    return array.sort(function(a, b) {
      a = getItem.call(cfg, a);
      b = getItem.call(cfg, b);
      return cfg.desc * (a < b ? -1 : +(a > b));
    });
  };
})();

export default class Notification {
  constructor() {}
  attachEvents() {
    if (localStorage.getItem('userToken')) {
      let user = JSON.parse(localStorage.getItem('userToken'));
      if (document.getElementById('notice')) {
        const urls = [
          baseUrl + '/balance/' + user.user.email,
          baseUrl + '/notification/' + user.user.email,
        ];
        //console.log('Token:  ' + ApiGetBothRecord.getLoggedInUser().token);
        const promises = urls.map(url =>
          fetch(url, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': user.token,
            },
          }).then(response => response.json()),
        );

        let noticeBoard = document.getElementById('notice_board');
        Promise.all(promises).then(datas => {
          // let userDetail = datas[0].data[0].accountBalance
          let userNotifications = datas[1].data[0].tranx;
          console.log(userNotifications);

          if (userNotifications.length > 0) {
            userNotifications = sortBy(userNotifications, {
              prop: 'created_at',
              desc: true,
              parser: d => new Date(d),
            });
            userNotifications.map((item, i) => {
              if (item.for_users == true && item.type != 'payment') {
                let markup = `
	                


              

            
		<input type="radio" name="accordion" id="cb1-${i}" />
		<section class="box-accordion">
			<label class="box-accordion-title" for="cb1-${i}"> ${item.type} || Readme</label>
			<label class="box-accordion-close" for="acc-close"></label>
			<div class="box-accordion-content"> ${item.description}</div>
		</section>















              `;

                $('#addAcc').append($(markup));
              }
            });
          }

          // let count = document.getElementById("notifyCount");
          // count.innerHTML = userNotifications.length;
        });
      }

      this.runeventHandler();
    }
  }

  runeventHandler() {
    // Listen for click on the document
    document.addEventListener('click', function(event) {
      //Bail if our clicked element doesn't have the class
      if (!event.target.classList.contains('accordion-toggle')) return;

      // Get the target content
      var content = document.querySelector(event.target.hash);
      if (!content) return;

      // Prevent default link behavior
      event.preventDefault();

      // If the content is already expanded, collapse it and quit
      if (content.classList.contains('active')) {
        content.classList.remove('active');
        return;
      }

      // Get all open accordion content, loop through it, and close it
      var accordions = document.querySelectorAll('.accordion-content.active');
      for (var i = 0; i < accordions.length; i++) {
        accordions[i].classList.remove('active');
      }

      // Toggle our content
      content.classList.toggle('active');
    });
  }
}
