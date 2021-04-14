import React, {Component,useState,useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../css/tableRecord.css';
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Checkbox from '@material-ui/core/Checkbox';
import store from '../store/store';
import { setCount, checkedItem1, checkedItem2, checkedItem3, addData, check, uncheck } from '../actions/myActions';
import { useSelector, useDispatch } from 'react-redux';
import {getCurrentDate} from '../utils/getCurrentDate'

//in this js file i have implemented infinite scroll table which consists of elements like:
//1. table header 
//2. table body
//3. check boxes
//concept used:
//4. infinite scroll functionality
//5. calling axios 
//6. using redux store concept
//7. using reacts hooks concept

function Example() {
  // let [responseData, setResponseData] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setPageCount] = React.useState(1);
  const [activeColor, setActiveColor] = React.useState(false);
  const dispatch = useDispatch();
  const recordCount = useSelector((state) => state.recordCount);
  const checkedItems = useSelector((state) => state.checkedItems);
  const responseData = useSelector((state) => state.responseData);

  let maxNoOfPages = parseInt(recordCount/20) + (recordCount%20>0?1:0);

  
  //fetching the initial table count from backend
  async function  setInitialLength() {
      return(
    await axios
        .get(
          `http://localhost:8080/1829099/FetchTotalNoOfRecords`
        )
        .then(response => {
          //storing the data in the redux store
          dispatch(setCount(response.data))
        })
        .catch(error => {
            console.log(error);
        }));
    }
    setInitialLength();

  //fetching table records according to the pageCount
  const fetchData = () => {
      console.log("fetchdata");
    axios
        .get(
          `http://localhost:8080/1829099/FetchRecord?page=${pageCount}`
        )
        .then(response => {
            let newData = response.data.map((item, index)=>(
            {
              customerName: item.customerName,
              custNumber: item.custNumber,
              invoiceId: item.invoiceId,
              totalOpenAmount: item.totalOpenAmount,
              dueInDate: item.dueInDate ? formatDate(item.dueInDate):item.dueInDate ,
              note: item.notes? formatNote(item.notes):formatNote('Lorem Ipsum dolor sit'),
              checked: false
            }
          ));
          //storing the data in thr redex store
          dispatch(addData([...responseData, ...newData]));
        })
        .catch(error => {
          console.log(error);
        });
  };

  //function for formating the note parameter to make it in a correct format
  function formatNote(note) {
    if(note.length>20)
        return note.substr(0,17)+'...';
    return note;
  }
  
  //function for formatting date parameter
  function formatDate(date){
    const dateMonth = date.substring(0, 3); 
    const dateDay = date.substring(4, 6);
    const dateYear = date.substring(8, 12);
    const newDate = dateDay + "-" + dateMonth + "-" + dateYear;
    return newDate;

  }

  
  

  //function is used to fetch more data from the database and incerase the page count by 1
    function fetchMoreData() {
       // console.log("fetchmoredata")
        setPageCount(pageCount + 1);
        if (pageCount > maxNoOfPages) {
          isNextFunc(false);
        }
    fetchData();
    }

  
  function tableRowStyle(item) {
    return(item.checked ? 'tableRowChecked':'tableRowUnchecked');
  }
  //useeffect is called fro fetching more data from db
  useEffect(() => {
    isNextFunc(true);
    fetchMoreData();
    
  }, []);

  //if the checkbox states changes then it will the update the store
  useEffect(() => {
    store.dispatch({
        type: 'UPDATE_CHECKED_ITEMS',
        checkedItems: checkedItems
    });
}, [checkedItems]);  

  //all the table part and infinite scroll part is rendered here 
  return (   
    <div id='container'>
      <InfiniteScroll
        dataLength={responseData.length}
        next={fetchMoreData}
        hasMore={isNext}
        loader={
          <div
            style={{ height: "80%", paddingLeft: "45%", overflow: "hidden" }}
          >
            <CircularProgress />
          </div>
        }
        scrollableTarget='gridtable'
        >
            <Table>
              <TableHead >
                <TableRow>
                <TableCell id = "TableHeadCell">
                  <Checkbox
                    classes={{root: 'checkboxStyle', checked: 'checked'}} 
                    //If the user checked the checbox then it will check all the checkboxes which are present on the Ui
                    onChange={e => {
                      if(e.target.checked) {
                          let items = Object.assign(responseData);
                          let temp = [];
                          responseData.forEach((item, index)=>{
                              items[index].checked=true;
                              dispatch(addData(items));
                              temp.push(responseData[index].invoiceId);
                          });
                          dispatch(checkedItem1(temp));
                      }
                      else {
                        //If the user unchecked the checbox then it will uncheck all the checkboxes which are present on the Ui
                          let items = Object.assign(responseData);
                          responseData.forEach((item, index)=>{
                              items[index].checked=false;
                              dispatch(addData(items));                                               
                          });
                          dispatch(checkedItem2());
                      }
                  }}
                  ></Checkbox>
                </TableCell>
                  <TableCell id = "TableHeadCell" >Customer Name</TableCell>
                  <TableCell id = "TableHeadCell" >Customer #</TableCell>
                  <TableCell id = "TableHeadCell" >Order #</TableCell>
                  <TableCell id = "TableHeadCell" >Invoice Amount</TableCell>
                  <TableCell id = "TableHeadCell" >Due Date</TableCell>
                  <TableCell id = "TableHeadCell" >Predicted Payment Date</TableCell>
                  <TableCell id = "TableHeadCell" >Pedicted Aging Bucket</TableCell>
                  <TableCell id = "TableHeadCell" >Notes</TableCell>
                </TableRow>
            </TableHead>
          <TableBody>
            {responseData.map((item, index) => (
            <TableRow id={tableRowStyle(item)} >
                <TableCell class = "TableBodyCell">
                  <Checkbox
                    classes={{root: 'checkboxStyle', checked: 'checked'}} 
                    checked={item.checked}
                    onChange={e => {
                        if(e.target.checked) {
                          //storing the invoiceId for the checked records in the store
                            dispatch(checkedItem3(item.invoiceId));
                          //updating the store that which check box has been checked
                            dispatch(check(index))
                        }
                        else {
                            let array = [...checkedItems];
                            
                            const i = array.indexOf(item.invoiceId);
                            if (i > -1) {
                                array.splice(i, 1);
                            }
                            //removing the invoiceid for unchecked checkboxes and updating the store
                            dispatch(checkedItem1(array));
                            ////updating the store that which check box has been unchecked
                            dispatch(uncheck(index))
                        }}}
                  ></Checkbox>
                </TableCell>
                <TableCell class = "TableBodyCell" >{item.customerName}</TableCell>    
                <TableCell class = "TableBodyCell" >{item.custNumber}</TableCell>
                <TableCell class = "TableBodyCell" >{item.invoiceId}</TableCell>
                <TableCell class = "TableBodyCell" >{item.totalOpenAmount>999?(item.totalOpenAmount/1000).toFixed(2)+'k':item.totalOpenAmount}</TableCell> 
                <TableCell class = "TableBodyCell" >{item.dueInDate}</TableCell> 
                <TableCell class = "TableBodyCell" >--</TableCell> 
                <TableCell class = "TableBodyCell" >--</TableCell> 
                <TableCell class = "TableBodyCell" >{item.note}</TableCell>           
            </TableRow>
             ) )}  
               </TableBody> 
               </Table>
      </InfiniteScroll>
      </div>
      
  );
}
export default Example;