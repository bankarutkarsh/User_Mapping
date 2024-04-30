import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../redux/user.slice";

const MapModal = () => {
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.userApp);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '',
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return (
    <div className="modal">
    <div
      className="modal-background"
      onClick={() => dispatch(setModal(false))}
    ></div>
    <div className="modal-content">
      {/* <p style={{ paddingTop: "0" }} className="image is-4by3"> */}
        {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3770.721014451496!2d72.87512507497743!3d19.075999982128597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDA0JzMzLjYiTiA3MsKwNTInMzkuNyJF!5e0!3m2!1sen!2sin!4v1713871248082!5m2!1sen!2sin"
        width="600"
        height="450"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe> */}
        {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={{ lat: 18.52043, lng: 73.856743 }}
                  name = {`${user.number}, ${user.street}, ${user.city}, ${user.zipcode}`}
          />
        </GoogleMap>
      )}
      {/* </p> */}
    </div>
    <button
      className="modal-close is-large"
      aria-label="close"
      onClick={() => dispatch(setModal(false))}
    ></button>
  </div>
  );
};

export default MapModal;
