import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDetailModal } from "../redux/user.slice";

function Details() {

    let dispatch = useDispatch();
    const {user} = useSelector((state) => state.userApp);

  return (
    <div className="modal">
      <div className="modal-background" onClick={()=>dispatch(setDetailModal(false))}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close"  onClick={()=>dispatch(setDetailModal(false))}></button>
        </header>
        <section className="modal-card-body">
            <h1>{user.name.firstname + " " + user.name.lastname}</h1>
            <h2>Title : <p>{user.title}</p></h2>
            <h2>Description</h2>
            <p>{user.description}</p>
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button className="button is-success">Save changes</button>
            <button className="button">Cancel</button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Details;
