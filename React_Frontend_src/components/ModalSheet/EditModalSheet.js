import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import { pxToVh, pxToVw } from '../../utils/theme';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import store from '../../store/store';
import { useSelector } from 'react-redux';

//in this js file i have implemented editmodalsheet component
//concept used
//redux store
//react hooks
//axios call

const useStyles = makeStyles((theme) => ({
  root: {
    padding : "20px",

  },
  color1:{
    backgroundColor : '#14AFF1',
    color : "#fff",
    borderColor:'#fff',
    borderRadius : 10,
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
    paddingLeft: '2vw'
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
  },
  closeIcon: {
    color: 'white',
    height: pxToVh(50),
    paddingRight: pxToVw(20)
  },
  text:{
    color : '#14AFF1',
    textAlign: 'left',
    font: 'normal normal normal 20px/24px Ubuntu',
    letterSpacing: '0px',
    opacity: 1,
    marginLeft : '30px'
  },
  bottombutton: {
    paddingLeft: '5vw'
  },
  clearbt:{
    color : "#fff",
    borderColor:'#14AFF1',
    borderRadius : 10,
    marginRight: '0.5vw'
  },
  internalBoxContents: {
    paddingBottom: '1.5vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteBoxContents: {
    paddingBottom: '1.5vh',
    display: 'flex',
    flexDirection: 'row',
  },
  notchedOutline:{
    borderWidth: "0.5px",
    borderRadius : "10px",
    color: "white"
  },
  labelText:{
    color: '#97A1A9',
    fontSize: pxToVh(20),
    paddingLeft: '1vw',
    paddingRight: '1vw',
    width: '9vw',
  
  },
  widthTextField : {
    width : '50%',
  }
  }));

export default function EditModalSheet(props){
  const classes = useStyles();
  const [totalOpenAmount, setTotalOpenAmount] =  React.useState('');
  const [notes, setNotes] = React.useState('');
  const checkedItems = useSelector((state) => state.checkedItems);
  
  //this function is used to updating the existing data in the database
  function editData() {
    axios
        .post(
        `http://localhost:8080/1829099/UpdateRecord`,
            [checkedItems[0], totalOpenAmount, notes]
        )
        .then(response => {
            console.log(response)
        })
        .catch(error => {
        console.log(error);
        });
  }

  //function for clearing the form
  function clearform(){
    setTotalOpenAmount();
    setNotes('');
  }

  return(
    <Paper className={classes.paper}>
      <div className={classes.box1}>
        <h1 className={classes.heading}>Edit Invoice</h1>
        <IconButton onClick={props.onClose} >
            <CloseIcon className={classes.closeIcon}/>
        </IconButton>
      </div>
      <div>
        <form  noValidate autoComplete="off" > 
          <Grid container className = {classes.root}>
            <Grid item xs = {12}>
              <div className={classes.internalBoxContents}>
                <label className={classes.labelText}>
                  Invoice Amount
                </label>                
                <TextField                        
                  id="Invoice Amount"
                  variant="outlined"
                  value={totalOpenAmount}
                  InputProps={{
                    className: classes.notchedOutline
                  }}
                  onChange={e => setTotalOpenAmount(e.target.value)}
                  required
                  className = {classes.widthTextField}
                />
              </div>
              <div className={classes.noteBoxContents}>
                <label className={classes.labelText}>
                  Notes 
                </label>                
                <TextField 
                  id="note"
                  variant="outlined" 
                  value={notes}  
                  multiline
                  rows={8}                      
                  InputProps={{
                      className: classes.notchedOutline
                  }}   
                  className = {classes.widthTextField} 
                  onChange={e => setNotes(e.target.value)}                           
                />
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
      <div className={classes.box3}>
        <Grid container className = {classes.root}>
            <Grid item xs = {6}>
              <Typography variant="h6" className = {classes.text} onClick={props.onClose}>
                Cancel
              </Typography>
            </Grid>
            <Grid item xs = {6} className = {classes.bottombutton}>
                <Button variant="outlined" className = {classes.clearbt} onClick = {clearform} >Reset</Button>
                <Button variant="contained" type="submit" className = {classes.color1} onClick = {editData}>Save</Button>
            </Grid>
        </Grid>
      </div>
    </Paper>
  );
}