import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


toast.configure();
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditPost = () => {
 const[title,setTitle] = useState("");
 const[url, setUrl] = useState("");
 const classes = useStyles();
 
 const editPost = async(e) => {
     e.preventDefault();
     const newInput = {
         title: title,
         url:url,
     };
     //Edit Request
     const res = await axios.put("https://jsonplaceholder.typicode.com/photos",
     newEdit
    
     );
     props.acceptNewQuote(res.data); //KATSU!!!!
    props.setIsShowCreatePost();
    toast("New Edit  Successfully Created");
    setTitle("");
    setUrl("");
console.log(res)
 }
};

return(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Submit a New Post
        </Typography>
        <form className={classes.form} noValidate onSubmit={createPost}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            label="Title"
            type="text"
            name="name"
            id="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Url"
            type="text"
            name="url"
            id="url"
            placeholder="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Edit New Post
          </Button>
        </form>
      </div>
    </Container>
)


export default EditPost;