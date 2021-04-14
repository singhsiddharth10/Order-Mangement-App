import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import { pxToVh, pxToVw } from '../../utils/theme';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { deleted } from '../../actions/myActions';
import axios from "axios";


//in this js file i have implemented deletemodalsheet component
//concept used
//redux store
//react hooks
//axios call

const useStyles = makeStyles((theme) => ({
  root: {
    padding : pxToVh(12),

  },
paper: {
    backgroundColor: theme.palette.background.paper,
    width: '30%',
    position: 'fixed',
    top: '50%',
    left: '33%',
    transform: 'translate(0, -50%)',
    overflowY: 'auto',
    backgroundColor: '#2A3E4C',
    display:'flex',
    flexDirection: 'column',
  },
  heading: {
      height: pxToVh(50),
      fontWeight: 400,
      color: '#fff',
      paddingLeft: '1.3vw'
  },
  box1:{
    flexGrow: 1,
    borderBottom: '0.001em solid black',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box2:{
    flexGrow: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'no-wrap'
  },
  box3:{
    flexGrow: 1,
    borderTop: '0.01vh solid black',
    padding : '10px'
  },
  closeIcon: {
    color: 'white',
    height: pxToVh(50),
    paddingRight: pxToVw(20)
},
bottombutton: {
  paddingLeft: '3vw'
},
clearbt:{
  color : "#fff",
  borderColor:'#14AFF1',
  borderRadius : 10,
  marginRight: '1vw',

},
color1:{
  backgroundColor : '#14AFF1',
  color : "#fff",
  borderColor:'#fff',
  borderRadius : 10,
},
grid:{
  padding : '21px'
},
}));

export default function DeleteButton(props) {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const checkedItems = useSelector((state) => state.checkedItems);

    //function to delete records in the store as well as in the database
    function handleSubmit(event) {
     
      axios.post('http://localhost:8080/1829099/DeleteRecord',checkedItems)
          .then(function (response) {
            //updating store
              dispatch(deleted())
          }).catch(
          function (error) {
              console.log(error)
          }
          );
      event.preventDefault();
  }
    return (
        <Paper className={classes.paper}>
        <div className={classes.box1}>
            <h2 className={classes.heading}>Delete record(s)?</h2>
            <IconButton  onClick  = {props.onClose}>
                <CloseIcon className={classes.closeIcon}/>
            </IconButton>
        </div>
        <div>
          <Grid container>
            <Grid item xs = {12} className = {classes.grid}>
              <p style = {{fontSize : '18px' , color : '#C0C6CA'}}> You'll lose your record(s) after this action. We can't recover<br></br> them once you delete.</p>
              
              <p style = {{fontSize : '18px', color : '#C0C6CA'}}> Are you sure you want to <a style={{color: "#FF5E5E"}}>permanently delete</a> them?</p>

            </Grid>
          </Grid>


        
        </div>
        <div className={classes.box3}>
            <Grid container className = {classes.root}>
                <Grid item xs = {6}>

                </Grid>
                <Grid item xs = {6} className = {classes.bottombutton}>
                  <Button variant="outlined" className = {classes.clearbt} onClick  = {props.onClose}>Cancel</Button>
                  <Button variant="contained" type="submit" onClick = {handleSubmit} className = {classes.color1}>Delete</Button>
                </Grid>
                
            </Grid>

        </div>
    </Paper>
    );
  }