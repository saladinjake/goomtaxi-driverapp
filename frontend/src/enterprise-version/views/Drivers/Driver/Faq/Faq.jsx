import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItineraryHistoryList from '../History/ItineraryHistoryList';

const activeUrl = 'https://goomtaxibackendapi.herokuapp.com/api/v1';

export default class FAQ extends Component {
  componentDidMount() {
    let mainNav;
    if (document.getElementById('loggedInOnly')) {
      mainNav = document.getElementById('loggedInOnly');
      mainNav.style.display = 'block';
      mainNav.style.opacity = 1;
    }
  }

  render() {
    const style1 = {
      visibility: 'hidden',
      display: 'none',
    };

    return (
      <div className="content-page">
        <div className="content" id="spread-out">
          <div className="container" id="faqs">
            <div className="row">
              <div className="col-sm-12">
                <div className="card-box">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="text-center">
                        <h3 className="font-600">Frequently Asked Questions</h3>
                        <p className="text-muted">
                          {' '}
                          Having difficulties navigating our website? Please read through the
                          frequently asked questions!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row m-t-40">
                    <div className="col-md-6">
                      <div className="p-20 p-t-0" id="column1"></div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-20 p-t-0" id="column2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
