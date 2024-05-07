import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../redux/user.slice";
import { useLoadScript } from "@react-google-maps/api";
import Loading from "./Loading";
import "tailwindcss/tailwind.css";

const MapModal = () => {
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.userApp);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  // const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  const s = user.address.street.split(" ").join("+");
  const c = user.address.city.split(" ").join("+");
  const n = user.address.building.split(" ").join("+");
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  // if (isLoaded) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Box>
  //         <CircularProgress />
  //       </Box>
  //     </div>
  //   );
  // }

  if (isLoaded) {
    return (
      <div className="modal">
        <div
          className="modal-background"
          onClick={() => dispatch(setModal(false))}
        ></div>
        <div className="modal-content map">
          <iframe
            title="map"
            src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${n},${s},${c}`}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {/* (
            <GoogleMap
              mapContainerClassName="map-container"
              center={center}
              zoom={10}
            >
              <Marker position={{ lat: user.address.geolocation.lat, lng: user.address.geolocation.long }}
                      name = {`${user.number}, ${user.street}, ${user.city}, ${user.zipcode}`}
              />
            </GoogleMap>
          )} */}
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => dispatch(setModal(false))}
        ></button>
      </div>
    );
  }
  return (
    <div className="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(setModal(false))}
      ></div>
      <Loading />
    </div>
  );
 
};

export default MapModal;
