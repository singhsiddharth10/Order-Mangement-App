import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PredictButton from './Buttons/Predictbutton'
import ViewCorrespondanceButton from './Buttons/ViewCorrespondanceButton';
import AddButton from './Buttons/AddButton';
import EditButton from './Buttons/EditButton';
import DeleteButton from './Buttons/DeleteButton';
import SearchBar from './SearchBar';

//in this file i am returning five button and one search bar and i have used material ui grid component to align all the button
//search bar.
const useStyles = makeStyles((theme) => ({
    root: {
      padding : "20px",
      zIndex: 10,
      position: 'fixed',
      height: '10vh',
      backgroundColor : "#2F4451",
      width: '95.9vw'
    },

    inline:{
        display : "flex",
    }
    
  }));

  function GridPanelSection() {
    const classes = useStyles();
    return (
      <div className = {classes.root}>
            <Grid container  >
                <Grid item xs = {7} className = {classes.inline}  >
                    <PredictButton/>
                    <ViewCorrespondanceButton/>
                </Grid>
                
                <Grid item xs = {5} className = {classes.inline}>
                    <AddButton/>
                    <EditButton/>
                    <DeleteButton/>
                    <SearchBar/>
                </Grid>
            </Grid>
        
          

      </div>
    );
  }
  export default GridPanelSection