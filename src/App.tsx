import React, { useState } from 'react';
import Map from './Map';
import Modal from './Modal';
function App() {
  const [showModal, setShowModal] = useState(true);
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Map message="test" />
        </header>
      </div>
      {showModal ? <Modal closeModal={setShowModal}></Modal> : null}
    </React.Fragment>
  );
}

export default App;
