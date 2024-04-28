import React, { useEffect, useState } from "react";
import MapModal from "./MapModal";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setUser } from "../redux/user.slice";
import { useDebounce } from "use-debounce";

function Members() {
  let dispatch = useDispatch();
  let { modal, users } = useSelector((state) => state.userApp);
  let [input, setInput] = useState("");
  // const [debouncedValue] = useDebounce(input,500)
  let [search,setSearch] = useState(false);

  function chunkArray(array, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }

  const usersInSequence = chunkArray(users, 3);

  let [matchUsers, setMatchUsers] = useState([...usersInSequence]);
  // useEffect(()=>{
  //   setMatchUsers(usersInSequence);
  // },[]);

  let handleChange = (event) => {
    setSearch(true)
    setInput(event.target.value);

    if (event.target.value === "") {
      setSearch(false);
    } else {
      let search = users.filter(
        (user) =>
          user.address.city.toLowerCase().includes(input.toLowerCase()) ||
          user.title.toLowerCase().includes(input.toLowerCase()) ||
          user.name.firstname.toLowerCase().includes(input.toLowerCase()) ||
          user.name.lastname.toLowerCase().includes(input.toLowerCase())
      );
      setMatchUsers(chunkArray(search, 3));
    }
  };

  return (
    <div className="column">
      <div className="dashboard">
        <div className="dashboard__content">
          <div className="header">
            <div>
              <p className="title is-5 is-pulled-left font-color-dark">
                Team Members
              </p>
              <p className="title is-6 is-pulled-right has-text-weight-bold font-color-primary button">
                Login
              </p>
              <p className="control">
                <input
                  className="input mr-1"
                  type="text"
                  placeholder="Find User"
                  value={input}
                  onChange={handleChange}
                />
                <button className="button has-text-weight-bold font-color-primary" onClick={handleChange}>
                  clear
                </button>
              </p>
            </div>
          </div>
          <div className="cardscon">
          {(search ? matchUsers : usersInSequence).map((row, index) => (
            <div className="row" key={index}>
              <div className="columns changeRow">
                {row.map((user) => (
                  <div className="column one-third" key={user.id}>
                    <div className="card">
                      <div className="card-content">
                        <div className="media">
                          <div className="media-left">
                            <figure className="image is-48x48">
                              <img
                                src={user.photo}
                                alt={
                                  user.name.firstname + " " + user.name.lastname
                                }
                              />
                            </figure>
                          </div>
                        </div>
                        <div className="media-content">
                          <p className="title is-6 is-uppercase font-color-primary has-text-weight-bold">
                            {user.name.firstname + " " + user.name.lastname}
                          </p>
                          <p className="subtitle is-7 font-color-light has-text-weight-bold">
                            {user.address.city}
                          </p>
                          <p className="content has-text-weight-bold font-color-medium">
                            {user.description}
                          </p>
                          <span
                            className="subtitle is-7 is-uppercase font-color-primary has-text-weight-bold sum"
                            onClick={() => {
                              dispatch(setModal(true));
                              dispatch(setUser(user));
                            }}
                          >
                            Summary
                          </span>
                          <br />
                          <span className="subtitle is-7 is-uppercase font-color-primary has-text-weight-bold detl">
                            View Details
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      {modal && <MapModal />}
    </div>
  );
}

export default Members;
