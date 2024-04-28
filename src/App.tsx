import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Snackbar} from '@mui/material';
import propTypes from 'prop-types';
import {useServiceWorker} from "./userServiceWorker";

function App() {

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const { waitingWorker, showReload, reloadPage } = useServiceWorker();
// decides when to show the toast
  useEffect(() => {
    if (showReload && waitingWorker) {
      console.log('service worker update waisting');
      setSnackbarMessage('A new version is available: exit the app to update');
      setSnackbarOpen(true);

    }
  }, [waitingWorker, showReload, reloadPage]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          Try 16
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Snackbar
          open={snackbarOpen}
          autoHideDuration={60000}
          message={snackbarMessage}
          action={
            <Button color="secondary" size="small" onClick={reloadPage}>
              Refresh
            </Button>
          }
          onClose={() => setSnackbarOpen(false)}
      />

    </div>


  );

}

// @ts-ignore
App.propTypes = {
  callback: propTypes.object
};




export default App;
