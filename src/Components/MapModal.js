import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../redux/user.slice";
import { useLoadScript } from "@react-google-maps/api";
import { Box, CircularProgress } from "@mui/material";

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

  return (
    <div className="modal">
      {isLoaded ? (
        <>
          <div
            className="modal-background"
            onClick={() => dispatch(setModal(false))}
          ></div>
          <div className="modal-content">
            {/* <p style={{ paddingTop: "0" }} className="image is-4by3"> */}
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${n},${s},${c}`}
              width="600"
              height="450"
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
        )}
        </p> */}
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => dispatch(setModal(false))}
          ></button>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <CircularProgress />
          </Box>
        </div>
      )}
    </div>
  );
};

export default MapModal;

