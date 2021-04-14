import { Card } from '@material-ui/core';
import React from 'react';
import GridPanelSection from './GridPanelSection'
import { makeStyles } from '@material-ui/core/styles';
import InfiniteScrollTable from './infiniteScrollCopy';

//in this file i am returning two components name as gridpanelsection and infinitescrolltable

const useStyles = makeStyles((theme) => ({
    root: {
      margin : "20px",
      backgroundColor : "#2F4451",
      maxHeight: '80vh',
      overflowY: 'scroll',
      overflowX: 'hidden',
      borderRadius : "10px",
    }    
  }));

  function GridTable() {
    const classes = useStyles();
    return (
          
          
          <Card className = {classes.root} id="gridtable">
              <GridPanelSection/>
              <InfiniteScrollTable/>
          </Card>
          
    );
  }
  export default GridTable
  