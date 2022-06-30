import React from 'react';
const PlanRenderer = () => {
  const items = [{}, {}];
  const showItems = () => {
    return items.map((item, i) => {
      return (
        <div key={i} className="col-sm-6 col-md-6 col-lg-3">
          <div className="price_card text-center">
            <div className="pricing-header bg-purple">
              <span className="price" style={{ fontSize: '24px' }}>
                ₦ 20,000
              </span>
              <span className="name">Goom Logistics Saver</span>
            </div>
            <div className="col-lg-12 m-t-20">
              <div className="col-sm-12 col-md-12 col-lg-12 center-block text-center">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>
            <button
              id="btn-1"
              data-id="btn-1"
              data-type="plan"
              data-plan="Goom Logistics Saver"
              data-price="20000"
              className=" btn btn-primary waves-effect waves-light w-md cd-add-to-cart js-cd-add-to-cart plan"
            >
              Choose
            </button>
          </div>
          <div className="overlay-plan" id="btn-1-plan">
            <a href="#" className="icon" title="User Profile">
              <i className="fa fa-check"></i>
            </a>
            <button
              style={{ margin: '50px auto', marginLeft: '30px' }}
              className="btn btn-primary waves-effect waves-light w-md reset"
            >
              Cancle
            </button>
          </div>
        </div>
      );
    });
  };

  return <div>{showItems()}</div>;
};

export default PlanRenderer;
