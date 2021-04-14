import React, { Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { pxToRem} from '../utils/theme';

//int this js file i am rendering gridheader which consist of only one element which is the heading name as "Invoice list"

const useStyles = makeStyles((theme) => ({
  appBarColor:{
      backgroundColor : '#3c4c61',
  },
  text:{
      color : "white",
      fontSize : pxToRem(28),
      
  }
}));

export default function GridHeader() {
  const classes = useStyles();
    return (
    <div className={classes.root}>
      <AppBar position="static" className = {classes.appBarColor} elevation = {0}>
          <Grid>
            <Toolbar>
                <Typography variant="h4" className = {classes.text}>
                    Invoice Lists
                </Typography>
            </Toolbar>
        </Grid>
        
      </AppBar>
    </div>
  );
}