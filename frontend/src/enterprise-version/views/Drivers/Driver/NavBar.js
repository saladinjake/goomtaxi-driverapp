import React, { useState } from 'react';
import axios from 'axios';

const NavBar = props => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showJourney, setShowJourney] = useState({});

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    axios.defaults.headers.common['Authorization'] = undefined;

    props.history.push('/login');
  };

  const monitorJourney = ev => {
    const state = ev.target.checked === true ? true : false;

    setShowJourney(journey => ({
      ...journey,
      [ev.target.id]: state,
    }));

    props.monitorJourney(ev);
  };

  return (
    <div className="navbar">
      {props.onMapMenu ? (
        <div className="menu collapsed">
          <span onClick={() => setShowMenu(!showMenu)}>MENU</span>
          {!showMenu ? null : user.user_type === 'driver' ? (
            <div className="menu-items">
              {props.driverJourneys.map((j, idx) => (
                <div key={idx} className="item">
                  <div className="first">
                    <span>{j.vehicle.code}</span>
                    <button
                      name="driver"
                      id={j._id}
                      className="start-button"
                      onClick={props.startJourney}
                    >
                      Start Journey
                    </button>
                  </div>
                  <div className="second">
                    <span>{j.status}</span>
                    <span>OR</span>
                    <span>DT</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="menu-items">
              {props.journeys.map((j, idx) => (
                <div key={idx} className="item">
                  <div className="first">
                    <span>{j.vehicle.code}</span>
                    <input
                      id={j._id}
                      type="checkbox"
                      onClick={monitorJourney}
                      checked={showJourney[j._id] ? true : false}
                    />
                  </div>
                  <div className="second">
                    <span>{j.status}</span>
                    <span>OR</span>
                    <span>DT</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
      <div className="settings">
        {user.userType !== 'driver' ? <div onClick={props.simulateJourneys}>Simulate</div> : null}
        <div onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
          <div className="profile-image">
            {user.firstName} {user.lastName} O
          </div>
          {showDropdown ? (
            <div className="dropdown-wrapper">
              <div className="dropdown">
                {user.userType !== 'admin' ? null : props.onMapMenu ? (
                  <div onClick={() => props.handleUrlRoute('/settings')}>Settings</div>
                ) : (
                  <div onClick={() => props.handleUrlRoute('/maps')}>Maps</div>
                )}
                <div onClick={handleLogout}>Logout</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
