import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import AddModalSheet from '../ModalSheet/AddModalSheet';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        padding : "20px",       
      },
    color : {
      color : "#97A1A9",
      borderColor:'#14AFF1',
      borderRadius : 10,
    },
    
  }));
//in this js file i have created addbutton component and a snackbar for validation
//if all the required filled is not empty then data will be added in db but if any of the mandatory field is empty it will pop up a snackbar
//And passing handlecloseand snackbaropenclick function as props in addmodalsheet 
export default function AddButton()  {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const snackbarOpenClick = () => {
    setSnackbarOpen(true);
  };

  const snackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      setSnackbarOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Button variant="outlined" className = {classes.color} startIcon = {<AddIcon></AddIcon>} onClick={handleOpen}> Add</Button>
      <Modal open={open} onClose={handleClose} >
          <AddModalSheet onClose = {handleClose} snackbarOpenClick={snackbarOpenClick}/>
      </Modal>
      <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={snackbarClose}
            message="Mandatory fields can't be empty"
            action={            
              <IconButton size="small"  onClick={snackbarClose}>
                <CloseIcon fontSize="small" />
              </IconButton>          
            }
          />
    </div>
  );
}


 