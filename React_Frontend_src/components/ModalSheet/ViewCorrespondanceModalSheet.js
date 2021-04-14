import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import { pxToVh, pxToVw } from '../../utils/theme';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import '../../css/tableRecord.css'


//in this js file i have implemented viewcorrespondancemodalsheet component
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
    width : '40%',
    paddingLeft : '15px',
    paddingRight : '15px'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: '60%',
    position: 'fixed',
    top: '50%',
    left: '20%',
    transform: 'translate(0, -50%)',
    overflowY: 'auto',
    overflowX: 'hidden',
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
  selectBox:{
    height: pxToVh(35),
    marginLeft : pxToVw(560),
    padding : pxToVw(10),
    backgroundColor : '#2A3E4C',
    color : '#fff'
  },
  text:{
    color : '#14AFF1',
    textAlign: 'left',
    font: 'Ubuntu',
    letterSpacing: '0px',
    marginRight : "2vw",
    padding : '2px'
    
  },
  bottombutton: {
    paddingLeft: '17vw',
    display:'flex'
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
  },
  tablePart : {
      height : '20vh',
      overflowX : 'hidden',
      paddingRight : '2vw'
      
  },
  }));

export default function ViewCorrespondanceModelSheet(props){
    const classes = useStyles();
    const [selector,setSelector] = React.useState(1);
    const [responseData,setResponseData] = React.useState([]);
    const checkedItems = useSelector((state) => state.checkedItems);

    
//useeffect is used to call the axios to fetch the data from databse according to the checked item
useEffect(()=> {
  axios
    .post(
      `http://localhost:8080/1829099/FetchRecordsViewCorres`, checkedItems
    )
    .then(response => {
      setResponseData([...responseData, ...response.data]);
      console.log("res");
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  },[])

//for switching betwwn the selector
const handleChangeSelcet=(event)=>{
    setSelector(event.target.value);
}
const ViewCorrsTable =()=>{
  return (
    <div className= {classes.tablePart}>
      <Table style = {{marginTop : 0}}>
        <TableHead  >
          <TableRow>
            <TableCell id = "TableHeadCell" align="centre">Order Number</TableCell>
            <TableCell id = "TableHeadCell" align="centre">PO Number</TableCell>
            <TableCell id = "TableHeadCell" align="centre">Invoice Date</TableCell>
            <TableCell id = "TableHeadCell" align="centre">Due Date</TableCell>
            <TableCell id = "TableHeadCell" align="centre">Currency</TableCell>
            <TableCell id = "TableHeadCell" align="centre">Open Amount($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responseData.map((item) => (
          <TableRow id = "tableRowUnchecked">
            <TableCell class = "TableBodyCell" align="centre" >{item.invoiceId} </TableCell>
            <TableCell class = "TableBodyCell" align="centre">{item.invoiceId}</TableCell>
            <TableCell class = "TableBodyCell" align="centre">{item.documentCreateDate}</TableCell>
            <TableCell class = "TableBodyCell" align="centre">{item.dueInDate}</TableCell>
            <TableCell class = "TableBodyCell" align="centre">{item.invoiceCurrency}</TableCell>
            <TableCell class = "TableBodyCell"align="centre">{item.totalOpenAmount}</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  );
};

//for download pdf
let chose;
const printer = () => {
  if(selector==1){
    chose= "template1";
  }else{
     chose= "template2";
  }
  const pdf = new jsPDF('l','px',[1000,1300]);
  //pdf.setFontSize(2);
  pdf.html(document.getElementById(`${chose}`),{
    margin: [50,50,] ,   callback: function (doc) {
      pdf.save();
    }})
 
};
//if the value of selector change it will render accordingly
useEffect(()=>{},[selector])

const ViewCorrDialogeBody =() =>{
  if(selector==1){
      return (
        <div id="template1">
          <Grid container style = {{padding : "20px" , color : "#FFFFFF"}}>
            <Grid item xs = {12} style = {{color : '#C0C6CA'}}>
              <div style = {{display : 'flex'}}> 
                <div>Subject:</div>
                <div style = {{color : '#fff'}}>Invoice Details-Acount Name</div>
              </div>
              <p> Dear Sir/Madam,</p>
              <p>Greetings!</p>
              <p>
                This is to remind you that there are one or more open invoices on your account.Please provide at your earlist conveince an update on the payment details or clarify the reason for the delay. If you have any specific issue with the invoice(s), 
              </p>
                Please let us know so that we can address it to the correct Department.
            </Grid>
           <Grid item xs = {12}>
                <ViewCorrsTable />
            </Grid>
            <Grid item xs = {12} style = {{color : '#C0C6CA'}}>
                <div style = {{display : 'flex' , marginTop : '10px'}}>
                    <div>Total Amount to be Paid:</div>
                    <div style = {{color : '#fff'}}> $124.00K </div> 
               </div>
               <p>
               In case you have already made a payment for the above items, please send us the details to ensure the payment is posted. Let us know if we can be of any further assistance. Looking forward to hearing from you.
               </p>
               <p>
               <div> Kind Regards,</div>
                <div style = {{color : '#fff'}}>[Sender’s First Name][Sender’s Last Name]</div>
                 <div style = {{display : 'flex'}}>
                     <div>Phone :</div>  
                     <div style = {{color :'#fff' }}>[Sender’s contact number]</div>
                </div>
                 <div style = {{display : 'flex'}}> 
                     <div>Fax : </div>
                     <div style = {{color:'#fff'}}>[If any]</div> 
                </div>
                 <div style = {{display : 'flex'}}>
                     <div> Email : </div>
                     <div style = {{color : '#fff'}}>[Sender’s Email Address]</div>
                </div>
                   
                <div style = {{color : '#fff'}}>Company Name[Sender’s Company Name]</div>
                    
                </p>
              </Grid>
          </Grid>
      </div>
      );
  }else {
      return (
        <div id="template2">
        <Grid container style = {{padding : "20px" }}>
          <Grid item xs = {12} style = {{color : '#C0C6CA'}}>
            <div style = {{display : 'flex'}}> 
              <div>Subject:</div>
              <div style = {{color : '#fff'}}>Invoice Details-Acount Name</div>
            </div>
          <p> Dear Sir/Madam,</p>
          <p>
              Gentle reminder that you have one or more open invoices on your account. Please get back to us with an expected date of payment. If you have any specific issue with the invoice(s), please let us know so that we can address it at the earliest. Please find the details of the invoices below:
          </p>
            </Grid>
        <Grid item xs = {12}>
            <ViewCorrsTable />
        </Grid>
        <Grid item xs = {12} style = {{color : '#C0C6CA' , marginTop : '10px'}}>
          <p>
            In case you have already made a payment for the above items, please send us the details to ensure the payment is posted. Let us know if we can be of any further assistance. Looking forward to hearing from you.
          </p>
          <p>
          <div> Kind Regards,</div>
            <div style = {{color : '#fff'}}>[Sender’s First Name][Sender’s Last Name]</div>
              <div style = {{display : 'flex'}}>
                <div>Phone :</div>  
                <div style = {{color :'#fff' }}>[Sender’s contact number]</div>
              </div>
                <div style = {{display : 'flex'}}> 
                  <div>Fax : </div>
                  <div style = {{color:'#fff'}}>[If any]</div> 
                </div>
                 <div style = {{display : 'flex'}}>
                    <div> Email : </div>
                    <div style = {{color : '#fff'}}>[Sender’s Email Address]</div>
                </div>
                <div style = {{color : '#fff'}}>Company Name[Sender’s Company Name]</div>
              </p>
        </Grid>
      </Grid>
    </div>
    );
  }
};

  return(
    <Paper className={classes.paper}>
      <div className={classes.box1}>
        <h1 className={classes.heading}>View Correspondence({checkedItems.length})</h1>
        <select value={selector} onChange={handleChangeSelcet} variant='outlined' className = {classes.selectBox}>
          <option value={1}>Template 1</option>
          <option value={2}>Templete 2</option>
        </select>
        <IconButton onClick={props.onClose} >
            <CloseIcon className={classes.closeIcon}/>
        </IconButton>
      </div>
      <div >
          <ViewCorrDialogeBody/>
      </div>
      <div className={classes.box3}>
        <Grid container className = {classes.root}>
            <Grid item xs = {6}>
              
            </Grid>
            <Grid item xs = {6} className = {classes.bottombutton}>
                <Typography variant="h6"  className = {classes.text} onClick={props.onClose}>
                    Cancel
                </Typography>
                <Button  variant = "contained" type="submit" className = {classes.color1} onClick= {printer} >Download</Button>
            </Grid>
        </Grid>
      </div>
    </Paper>
  );
}