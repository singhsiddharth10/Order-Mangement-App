import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import Modal from '@material-ui/core/Modal';
import DeleteModalSheet from '../ModalSheet/DeleteModelSheet';
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
  
  //in this js file i have created a delete button
  //and paasing handleClose as a prop to deleteModalShhet
export default function DeleteButton() {
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
    //this function is used to check if the the checkbox count is greater than 1 then it will activate button else disabled the button
    React.useEffect(() => {
      if(checkedItems.length >=1)
        setActiveButton(true);        
      else
        setActiveButton(false);
    }, [checkedItems]);

  return (
      <div className={classes.root}>
        <Button variant="outlined" className = {classes.color} startIcon = {<RemoveIcon/>} onClick={handleOpen} disabled={!activeButton}
        style={{borderColor: activeButton?'#14AFF1':'#97A1A9', color:activeButton?'#fff':'#97A1A9'}}> 
          Delete 
        </Button>
        <Modal open={open} onClose={handleClose} >
          <DeleteModalSheet onClose ={handleClose}/>
        </Modal>
      </div>
    );
  }


  
