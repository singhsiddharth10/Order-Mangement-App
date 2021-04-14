import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import EditModelSheet from '../ModalSheet/EditModalSheet'
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        padding : "20px",

      },
    color : {
        color : "#97A1A9",
        borderColor:'#97A1A9',
        borderRadius : 10,
        
    },
    
  }));

//in this js file i have created a edit button
//and passing handleClose as a props to editmodalSheet
export default function EditButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [activeButton, setActiveButton] = React.useState(false);
  const checkedItems = useSelector((state) => state.checkedItems);
    
  const handleOpen = () => {
      setOpen(true);
  };
  
  const handleClose = () => {
      setOpen(false);
  };
  //in this function i am checking if the checkbox counnt is 1 then it will activate the button else button will be disabled
  React.useEffect(() => {
    if(checkedItems.length==1)
      setActiveButton(true);        
    else
      setActiveButton(false);
  }, [checkedItems]);

  return (
      <div className={classes.root}>
        <Button variant="outlined" className = {classes.color} startIcon = {<EditIcon></EditIcon>} onClick={handleOpen} disabled={!activeButton} 
          style={{borderColor: activeButton?'#14AFF1':'#97A1A9', color:activeButton?'#fff':'#97A1A9'}} > 
          Edit 
        </Button>      
      <Modal open={open} onClose={handleClose} >
        <EditModelSheet onClose ={handleClose}/>
      </Modal>
      </div>
    );
  }






  