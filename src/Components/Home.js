import React, { useEffect } from "react";
import "../Styles/home.scss";
import Members from "./Members";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMembers, setUsers } from "../redux/user.slice";
import Admin from "./Admin";

function Home() {
  let dispatch = useDispatch();
  let { members, flag } = useSelector((state) => state.userApp);

  useEffect(() => {
    async function fetchUser() {
      let response = await axios.get(
        "https://users-data-bynry.vercel.app/users");
      dispatch(setUsers(response.data.users));
    };
    fetchUser();
    console.log('render')
  }, [flag]);

  return (  
    <div id="app">
      <div className="containerBox">
        <div className="columns is-gapless">
          <div className="column is-3">
            <aside className="menu">
              <ul className="menu-list">
                <div className="menu-list__profile media">
                  <div className="media-left">
                    <figure className="image">
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/profile/profile-512.jpg?100000" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-5 font-color-white">
                      Utkarsh Bankar
                    </p>
                    {/* <p className="subtitle is-7 has is-uppercase font-color-white has-text-weight-bold">
                      edit
                    </p> */}
                  </div>
                </div>
                <div className="menu-list__main is-uppercase has-text-left">
                  <li>
                    <a className={members ? "subtitle is-7" : "subtitle is-7 active" } onClick={()=>dispatch(setMembers(false))}>
                      <i className="fas fa-cubes" />
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a className={members ? "subtitle is-7 active" : "subtitle is-7"  } onClick={()=>dispatch(setMembers(true))}>
                      <i className="fas fa-user" /> Members
                    </a>
                  </li>
                </div>
              </ul>
            </aside>
          </div>
          { members ? <Members /> : <Admin />}
        </div>
      </div>
    </div>
  );
}

export default Home;
