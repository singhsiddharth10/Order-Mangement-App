import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


//in this js file i have created predict button

const useStyles = makeStyles((theme) => ({
    root: {
        padding : "20px",

      },
    color : {
      backgroundColor : "#14AFF1",
      color : "#fff",
      borderRadius : 10,
    }
  }));

  export default function ContainedButtons() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Button variant="contained" className = {classes.color}>Predict</Button>
      </div>
    );
  }