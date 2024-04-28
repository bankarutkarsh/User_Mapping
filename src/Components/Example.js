import React from "react";
import "../Styles/test.scss";

const UserCard = ({ user }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src={user.photo}
                alt={`${user.name.firstname} ${user.name.lastname}`}
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-6 is-uppercase font-color-primary has-text-weight-bold">
              {`${user.name.firstname} ${user.name.lastname}`}
            </p>
            <p className="subtitle is-7 font-color-light has-text-weight-bold">
              {user.address.city}
            </p>
            <p className="content has-text-weight-bold font-color-medium">
              {user.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function Example() {
  const users = [
    // Your user data here
  ];

  function chunkArray(array, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }

  const usersInSequence = chunkArray(users, 3);

  return (
    <div id="app">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-3">
            <aside className="menu">
              <ul className="menu-list">
                <li className="menu-list__profile media">
                  <div className="media-left">
                    <figure className="image is-64x64">
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/profile/profile-512.jpg?100000" alt="Profile" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-5 font-color-white">Hassan Djirdeh</p>
                  </div>
                </li>
                <li className="menu-list__main is-uppercase has-text-left">
                  <a className="subtitle is-7">
                    <i className="fas fa-cubes"></i>Dashboard
                  </a>
                  <a className="subtitle is-7 active">
                    <i className="fas fa-user"></i> Members
                  </a>
                </li>
              </ul>
            </aside>
          </div>
          <div className="column">
            <div className="dashboard">
              <div className="dashboard__content">
                <div className="header">
                  <p className="title is-5 is-pulled-left font-color-dark">Team Members </p>
                </div>
                {usersInSequence.map((row, index) => (
                  <div className="row" key={index}>
                    {row.map(user => (
                      <div className="column is-4" key={user.id}>
                        <UserCard user={user} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Example;

