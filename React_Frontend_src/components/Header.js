import React, { Component } from 'react';
import Logo1 from '../assets/companyLogo.svg'
import Logo4 from '../assets/logo.svg'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { pxToRem, pxToVw } from '../utils/theme';


//In this file I am redenring the header part which consist of three elements:
//1. Abc product Logo
//2. ABC Poduct Text
//3. HighRadius logo
//For this I have used material ui components like appbar, typography, toolbar and implement css
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logoPosition: {
    marginLeft: 'auto',
    marginRight : '42vw',
  },
  appBarColor:{
      backgroundColor : '#3c4c61',
  },
  text:{
      color : "white",
      padding : pxToRem(20),
      fontWeight : "bolder"
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className = {classes.appBarColor} elevation = {0}>
        <Toolbar>
            <img src = {Logo1}></img> 
            <Typography variant="h4" className = {classes.text}>
                ABC Products
            </Typography>
            <section className = {classes.logoPosition}>
                <img src = {Logo4}></img>
            </section>
        </Toolbar>
      </AppBar>
    </div>
  );
}