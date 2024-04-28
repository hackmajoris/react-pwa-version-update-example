import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Snackbar } from '@mui/material';
import propTypes from 'prop-types';
// @ts-ignore
function App({callback}) {


  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');


  React.useEffect(() => {
    callback.onUpdate = () => {
      console.log('service worker update waisting');
      setSnackbarMessage('A new version is available: exit the app to update');
      setSnackbarOpen(true);
    };
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          Try1
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
