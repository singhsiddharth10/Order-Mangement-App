import React, {Component,useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

//in this js file i have created searchbar component

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 300,
    marginTop : '19px',
    height : 32,
    border: '1px solid #97A1A9',
    backgroundColor : "#273D49CC",
    opacity: 1,
    padding : '2px'

    
  },
  input: {
    marginLeft: theme.spacing(2),
    color : "#97A1A9",
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  let [responseData, setResponseData] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(true);
  let [pageCount, setCount] = React.useState(1);
  let [searchData, setSearchData] = React.useState('');

  const fetchData = () => {
    if (isNext) {
      axios
        .get(
          `http://localhost:8080/1829099/SearchRecords?page=${pageCount}&searchData=${searchData}`
        )
        .then(response => {
          setResponseData([...responseData, ...response.data]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  function fetchMoreData() {
    setCount(pageCount + 1);
    if (pageCount > 2500) {
      isNextFunc(false);
    }
    fetchData();
  }

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search by Order Number"
        inputProps={{ 'aria-label': 'Search by Order Numbe' }}
      />
      <IconButton type="submit" aria-label="search" className = {classes.input}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
