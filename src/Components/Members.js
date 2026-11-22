import React, { useMemo, useState } from "react";
import MapModal from "./MapModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setDetailsModal,
  setModal,
  setSelectedUser,
  setUser,
} from "../redux/user.slice";
import Details from "./Details";
import { useLoadScript } from "@react-google-maps/api";
import Loading from "./Loading";
import useDebounce from "../hooks/useDebounce";

function Members() {
  let dispatch = useDispatch();
  let { modal, detailsModal, users } = useSelector((state) => state.userApp);
  let [input, setInput] = useState("");

  const debouncedQuery = useDebounce(input.trim().toLowerCase(), 300);

  function chunkArray(array, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }

  let handleChange = (event) => {
    setInput(event.target.value);
  };

  const chunkedArray = useMemo(() => {
      const filteredArray = debouncedQuery
        ? users.filter((user) =>
            [
              user.name?.firstname,
              user.name?.lastname,
              user.title,
              user.address?.city,
            ].some((field) => field?.toLowerCase().includes(debouncedQuery)),
          )
        : users;
        return chunkArray(filteredArray, 3)
    }, [users, debouncedQuery]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  if (!isLoaded || users.length === 0) {
    return <Loading />;
  }

  return (
    <div className="column">
      <div className="dashboard">
        <div className="dashboard__content">
          <div className="header">
            <div>
              <p className="title is-5 is-pulled-left font-color-dark">
                Team Members
              </p>
              {/* <Link to={'/login'}>
              <p 
                className="title is-6 is-pulled-right has-text-weight-bold font-color-primary button">
                Login
              </p>
              </Link> */}
              <p className="control">
                <input
                  className="input mr-1"
                  type="text"
                  style={{ borderColor: "#dbdbdb" }}
                  placeholder="Find User"
                  value={input}
                  onChange={handleChange}
                />
                <button
                  className="button has-text-weight-bold font-color-primary"
                  onClick={handleChange}
                >
                  clear
                </button>
              </p>
            </div>
          </div>
          <div className="cardscon">
            {(chunkedArray).map((row, index) => (
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
                                    user.name.firstname +
                                    " " +
                                    user.name.lastname
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
                            <span
                              onClick={() => {
                                dispatch(setSelectedUser(user));
                                dispatch(setDetailsModal(true));
                              }}
                              className="subtitle is-7 is-uppercase font-color-primary has-text-weight-bold detl"
                            >
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
      {detailsModal && <Details />}
    </div>
  );
}

export default Members;
