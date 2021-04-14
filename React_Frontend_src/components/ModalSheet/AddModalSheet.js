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
import { add } from '../../actions/myActions';
import { useSelector, useDispatch } from 'react-redux';

//in this js file i have implemented addmodalsheet component
//concept used
//redux store
//react hooks
//axios call

const useStyles = makeStyles((theme) => ({
    root: {
        padding : "20px",       
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        width: '55%',
        position: 'fixed',
        top: '50%',
        left: '23%',
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
    internalBox1:{
        width: '28vw',
        display: 'flex',
        flexDirection: 'column'
    },
    internalBox2:{
        width: '28vw',
        display: 'flex',
        flexDirection: 'column'
    },
      
    notchedOutline:{
        borderWidth: "0.5px",
        width:"14vw",
        color: "white",
        borderRadius : "10px",
    },
    labelText:{
        color: '#97A1A9',
        fontSize: pxToVh(22),
        paddingLeft: '1vw',
        paddingRight: '1vw',
        width: '9vw',
    },
    internalBoxContents: {
        paddingBottom: '1.5vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    noteBoxContents: {
        paddingBottom: '1.5vh',
        display: 'flex',
        flexDirection: 'row',
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
        paddingLeft: '16vw'
    },
    clearbt:{
        color : "#97A1A9",
        borderColor:'#97A1A9',
        borderRadius : 10,
        marginRight: '1vw'
    },
    color1:{
        backgroundColor : '#14AFF1',
        color : "#fff",
        borderColor:'#fff',
        borderRadius : 10,
    },
}));

export default function AddModalSheet(props){
    const classes = useStyles();
    const [custName, setCustName] =  React.useState('');
    const [custNo, setCustNo] =  React.useState('');
    const [orderId, setOrderId] =  React.useState(0);
    const [totalOpenAmount, setTotalOpenAmount] =  React.useState(0.0);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [notes, setNotes] = React.useState('');
    const dispatch = useDispatch();

    //function to add data in the store as well as in the database by calling axios
    function handleSubmit(event) {
        const postData ={
        customerName : custName,
        custNumber : custNo,
        invoiceId : orderId,
        totalOpenAmount : totalOpenAmount,
        dueInDate : selectedDate,
        note : notes,
        checked: false
        }  

        //checking if there are any empty mandatory field
        if(!custName || !custNo || !orderId || !totalOpenAmount || !selectedDate) {
            props.snackbarOpenClick();
        }
        else {
            axios.post('http://localhost:8080/1829099/AddRecord',postData)
                .then(function (response) {
                    //updating store
                    dispatch(add(postData));
                    //if the record added successfully then it will clear all the fields
                    clearform();
                }).catch(
                function (error) {
                    console.log(error)
                }
            );
        }
        event.preventDefault();
    }
  
    //function used to clear all the fields
    function clearform(){
        setCustName('');
        setCustNo('');
        setOrderId(0);
        setTotalOpenAmount(0.0);
        setSelectedDate(new Date());
        setNotes('');
        
    }

    return(
        <Paper className={classes.paper}>
        <div className={classes.box1}>
            <h1 className={classes.heading}>Add Invoice</h1>
            <IconButton onClick={props.onClose}>
                <CloseIcon className={classes.closeIcon}/>
            </IconButton>
        </div>
        <div className>
        <form  noValidate autoComplete="off" onSubmit={handleSubmit}> 
            < Grid container className = {classes.root}>
                <Grid item xs = {6}>
                <div className={classes.internalBoxContents}>
                    <label className={classes.labelText}>
                        Customer Name 
                        <a style={{color: "red"}}>*</a>
                    </label>                
                    <TextField                        
                        value={custName}
                        id="custName"
                        variant="outlined"
                        InputProps={{
                            className: classes.notchedOutline
                        }}
                        onChange={e => setCustName(e.target.value)}
                        required
                    />
                </div>
                <div className={classes.internalBoxContents}>
                    <label className={classes.labelText}>
                        Customer No.
                        <a style={{color: "red"}}>*</a>
                    </label>                
                    <TextField
                        value={custNo}
                        id="custNo"
                        variant="outlined"
                        InputProps={{
                            className: classes.notchedOutline
                        }}
                        onChange={e => setCustNo(e.target.value)}
                        required
                    />
                </div>
                <div className={classes.internalBoxContents}>
                    <label className={classes.labelText}>
                       Order No.
                        <a style={{color: "red"}}>*</a>
                    </label>                
                    <TextField
                        value={orderId}
                        id="orderId"
                        variant="outlined"
                        InputProps={{
                            className: classes.notchedOutline
                        }}       
                        onChange={e => setOrderId(e.target.value)}       
                        required                                  
                    />
                </div>
                <div className={classes.internalBoxContents}>
                    <label className={classes.labelText}>
                        Invoice Amount 
                        <a style={{color: "red"}}>*</a>
                    </label>                
                    <TextField
                        value={totalOpenAmount}
                        id="totalOpenAmount"
                        variant="outlined"                        
                        InputProps={{
                            className: classes.notchedOutline
                        }}
                        onChange={e => setTotalOpenAmount(e.target.value)}
                        required
                    />
                </div>
                </Grid>
                <Grid item xs = {6} >
                    <div className={classes.internalBoxContents}>
                        <label className={classes.labelText}>
                            Due Date 
                            <a style={{color: "red"}}>*</a>
                        </label>                
                        <TextField
                            value={selectedDate}
                            id="dueDate"
                            type="date"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            InputProps={{
                                className: classes.notchedOutline
                            }}
                            onChange={e => setSelectedDate(e.target.value)} 
                            required
                        />                    
                    </div>
                    <div className={classes.noteBoxContents}>
                        <label className={classes.labelText}>
                            Notes 
                        </label>                
                        <TextField 
                            value={notes}                
                            id="note"
                            variant="outlined"  
                            multiline
                            rows={8}                      
                            InputProps={{
                                className: classes.notchedOutline
                            }}      
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
                    <Button variant="outlined" className = {classes.clearbt} onClick = {clearform}>Clear</Button>
                    <Button variant="contained" onClick={handleSubmit} type="submit" className = {classes.color1}>Add</Button>
                </Grid>
                
            </Grid>

        </div>
    </Paper>

    );
}