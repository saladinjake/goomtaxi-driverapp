import React, { useState } from 'react';
import ReactDOM from 'react-dom';

class Collection extends React.Component {
  render() {
    return (
      <div
        className="collection card-box col-md-3"
        onClick={() => this.props.setSelected(this.props.name)}
      >
        <div className="collection-name">
          {this.props.name}{' '}
          {this.props.selected === this.props.name && (
            <span className="collection-selected-badge">SELECTED</span>
          )}
        </div>
        <div className="collection-description">{this.props.description}</div>
        <div className="collection-description">{this.props.numQuestions} questions</div>
      </div>
    );
  }
}

const CollectionList = props => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="collections">
      <Collection
        name="Taxi Service"
        description="Book A cab with a taxi driver or choose to drive your self"
        numQuestions="400"
        selected={selected}
        setSelected={setSelected}
      />
      <Collection
        name="Byke Ride"
        description="Take a tour with a dispatch rider"
        numQuestions="21"
        selected={selected}
        setSelected={setSelected}
      />
      <Collection
        name="Cargo Shipping"
        description="Logistics and frieghts system . Send your goods to any locaation"
        numQuestions="12"
        selected={selected}
        setSelected={setSelected}
      />
      <Collection
        name="Air travel and tourism"
        description="Travel the world one click away by air"
        numQuestions="20"
        selected={selected}
        setSelected={setSelected}
      />
      <Collection
        name="Train station"
        description="Book a train service"
        numQuestions="16"
        selected={selected}
        setSelected={setSelected}
      />
      <Collection
        name="Dispatch Delivery service"
        description="Send your parcels via a dispatch rider"
        numQuestions="4"
        selected={selected}
        setSelected={setSelected}
      />
      <Collection
        name="Mail Man service"
        description="Send your parcels via a mail man"
        numQuestions="4"
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

export default CollectionList;
