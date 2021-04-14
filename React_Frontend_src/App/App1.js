import React, { Component } from 'react';
import Header from '../components/Header'
import GridLayouts from '../components/GridLayouts'
import { makeStyles } from '@material-ui/core/styles';
import store from '../store/store';
import { Provider } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#6D7183',
      outline: '1px solid slategrey',
    },
  },
}));

//In this js file I am rendering header and gridlayout component 
function App1() {
  const classes = useStyles();

    return (
    <Provider store={store}>
      <>
        <Header/>
        <GridLayouts/>
      </>
    </Provider>
    );
  }
  
  export default App1;

  
  