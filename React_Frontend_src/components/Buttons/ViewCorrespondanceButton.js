import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ViewCorrespondanceModelSheet from '../ModalSheet/ViewCorrespondanceModalSheet';
import { useSelector } from 'react-redux';

//in this js file i have created viewcorrespondance button 
//and i have passed handleClose as a props in viewcorrespondancemodalsheet
const useStyles = makeStyles((theme) => ({
    root: {
        padding : "20px",
    },
    color : {
        color : "#97A1A9",
        borderColor: '#97A1A9',
        borderRadius : 10,
    }

  }));

  export default function ViewCorrespondance() {
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
  //in this function i am checking if the count of checkbox is more than 1 then it will enabled the button else disabled the button
  React.useEffect(() => {
    if(checkedItems.length >=1)
      setActiveButton(true);        
    else
      setActiveButton(false);
  }, [checkedItems]);
  
  return (
    <div className={classes.root}>
      <Button variant="outlined" className = {classes.color} onClick={handleOpen} disabled={!activeButton}
        style={{borderColor: activeButton?'#14AFF1':'#97A1A9', color:activeButton?'#fff':'#97A1A9'}} >
            View Correspondence
      </Button>
      <Modal open={open} onClose={handleClose} >
        <ViewCorrespondanceModelSheet onClose ={handleClose}/>
      </Modal>
    </div>
    );
  }