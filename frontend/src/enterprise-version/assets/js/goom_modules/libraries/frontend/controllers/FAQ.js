import $ from 'jquery';

import FaqModel from '../models/FaqsModel';
import getApiUrl from '../../backend/services/apiservices/helpers/getOnlineUrlConnection';
let baseUrl = getApiUrl();

export default class FAQ {
  constructor() {}

  attachEvents() {
    if (document.getElementById('faqs')) {
      this.indexPageController();
    }
  }

  static render(items) {
    const recordItems = document.querySelector('#column1');

    if (items.length === 0) {
      recordItems.innerHTML = 'No records Yet';
      recordItems.style.textAlign = 'center';
      recordItems.style.fontSize = '32px';
      recordItems.style.font = 'bold';
    } else {
      var count_data = items.length;

      $.each(items, function(index) {
        var column = index < count_data / 2 ? 1 : 2;
        $('#column' + column).append(` <div class="faq-box">
                              <h4 class="question">${this.question}</h4>
                              <p class="answer">${this.answer}</p>
                            </div>`);
      });
    }
  }

  indexPageController() {
    let that = this;
    let dataPromise = FaqModel.getAllFaqs();
    //console.log(dataPromise)
    dataPromise
      .then(data => {
        let newData = data.data[0].carsAvailable;
        console.log(newData);
        FAQ.render(newData);
      })
      .catch(err => console.log(err));
  }
}
