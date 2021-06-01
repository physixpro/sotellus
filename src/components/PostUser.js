import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button,TextField } from "@material-ui/core";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";
import Quotes from "./Quotes";

toast.configure();
const PostUser = (props) => {


/******** STATES **********/
const[title,setTitle] = useState("");
const[url,setUrl] = useState("");


/********STATE FUNCTIONS *******/
// const recordTitle = (e) => {
// setTitle(e.target.value);
// console.log(e.target.value)
// };

// const recordUrl = (e) => {
// setUrl(e.target.value);
// console.log(e.target.value)
// }


  
    
  

  const notify = () => {
    toast("New User Successfully Created");
  };

  const BootstrapButton = withStyles({
    root: {
      boxShadow: "none",
      textTransform: "none",
      fontSize: 16,
      padding: "6px 12px",
      border: "1px solid",
      lineHeight: 1.5,
      backgroundColor: "#0063cc",
      borderColor: "#0063cc",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        backgroundColor: "#0069d9",
        borderColor: "#0062cc",
        boxShadow: "none",
      },
      "&:active": {
        boxShadow: "none",
        backgroundColor: "#0062cc",
        borderColor: "#005cbf",
      },
      "&:focus": {
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
      },
    },
  })(Button);

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      "&:hover": {
        backgroundColor: purple[700],
      },
    },
  }))(Button);

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  const classes = useStyles();





  const createUser = async (e) => {
e.preventDefault();
    const newUser = {
        title: title,
        url: url
    };
  // POST request
  const res = await axios.post(
    "https://jsonplaceholder.typicode.com/photos",
    newUser
  );
    // In the console in the browser data.[whatever] is this
    // 1) grab the object from the response
    // 2) take component state and update it
    // 3) Specifically: Take the object and append it to the Array
    // example: Array.concat(newObject) OR [...existingArray, newObject] <-- that's what you set the new updated state to be
    console.log(res.data)
    props.acceptNewQuote(res.data) //KATSU!!!!
    setTitle("");
    setUrl("");
};

  return (
    <div>
<form onSubmit={createUser}>
        <div className="form-group">
        <TextField label="Title" type="text" name="name" id="title" placeholder="Title" onChange={e => setTitle(e.target.value)} value={title}/> 
        </div>
        <div className="form-group">
        <TextField label="Url" type="text" name="url" id="url" placeholder="url" onChange={e => setUrl(e.target.value)} value={url}/> 
        </div>

        <ThemeProvider theme={theme}>
        <Button onClick={notify}  type="submit" variant="contained" color="primary" className={classes.margin}>
          Create New User
        </Button>
      </ThemeProvider>

     
    </form>


    </div>
    
        
       
     
     
    
  );
};

export default PostUser;
