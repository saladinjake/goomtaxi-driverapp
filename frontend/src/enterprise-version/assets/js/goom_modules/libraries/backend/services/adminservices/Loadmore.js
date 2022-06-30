var LoadMore = function(userOptions) {
  this.options = {
    pageSize: 10,
    dataUrl: '',
    container: '#loadbase',
    triggerText: 'Show More',
    triggerLoadingText: '...loading',
    trigger: '#showMoreTrigger',
    callback: null,
  };
  $.extend(this.options, userOptions);
  this._index = 0;
  this._itemsCurrentlyDisplayed = 0;
};

LoadMore.prototype.scrollToElement = function(selector, time, verticalOffset) {
  time = typeof time != 'undefined' ? time : 1000;
  verticalOffset = typeof verticalOffset != 'undefined' ? verticalOffset : 0;
  var element = $(selector);
  var offset = element.offset();
  var offsetTop = offset.top + verticalOffset;
  //if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
  //setTimeout(function () {
  //        window.scrollTo(0, offsetTop);
  //    }, 100
  //);
  //} else {
  /*$('html,body').scrollTo(selector, {
    duration: 1500
  });*/

  $('html,body').animate(
    {
      scrollTop: offsetTop,
    },
    800,
    function() {
      $('html,body').clearQueue();
    },
  );
  //}
};

LoadMore.prototype.loadData = function(gottenData) {
  var self = this;
  self.triggerFeedback(true);
  $.getJSON(self.options.dataUrl, function(data) {
    self.triggerFeedback(false);
    var totalResults = gottenData.length; //data.results.length;
    var items = [];
    var dataArr = gottenData.splice(self._index, self.options.pageSize); // data.results.splice(self._index, self.options.pageSize);
    if (dataArr.length > 0) {
      $.each(dataArr, function(key, item) {
        items.push(`<li  className="row  loadmore  card">
          
          <div className="activity-content col-xs-10  ">
            <div className="inner">
              <span className="date">${item.date} || ${item.message_type}</span>
              <div className="name">${item.admin}</div>
              <div className="content">
                <p>
                   ${item.logMessage}
                </p>
                 <p>
                  Module: ${item.module_name} || status: ${item.status}
                </p>
              </div>
            </div>
          </div>
          <hr/>
        </li>`);
      });
      $(items.join('')).appendTo(self.options.container);
      var scrollToEl = $('.result').get(self._index);
      self._index += self.options.pageSize;
      if (scrollToEl) {
        // occurs only when not the initial
        // load of data
        self.scrollToElement(scrollToEl);
      }
      self._itemsCurrentlyDisplayed += dataArr.length;
      if (self._itemsCurrentlyDisplayed >= totalResults) {
        self._trigger.hide();
      }
      if (self.options.callback != null) {
        self.options.callback();
      }
    }
  });
};

LoadMore.prototype.triggerFeedback = function(isLoading) {
  if (isLoading) {
    this._trigger.text(this.options.triggerLoadingText);
  } else {
    this._trigger.text(this.options.triggerText);
  }
};

LoadMore.prototype.init = function(dataFromFetch) {
  var self = this;
  $(document).ready(function() {
    self._trigger = $(self.options.trigger);
    self.loadData(dataFromFetch);
    self._trigger.on('click', function() {
      self.loadData(dataFromFetch);
    });
  });
};

export default LoadMore;
