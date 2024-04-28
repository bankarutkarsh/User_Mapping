import React, { useState } from 'react'
import { Modal } from 'react-bulma-components';

function Profile() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      {showModal &&(<div className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <p className="image is-4by3">
          <img src="https://bulma.io/assets/images/placeholders/1280x960.png" alt="" />
        </p>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
    )}
    </div>
  );
}



export default Profile