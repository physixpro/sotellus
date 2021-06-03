import React, { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { LoremIpsum } from "lorem-ipsum";
import "./Quotes.css";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  title: {
    height: 70,
    overflow: "hidden",
  },
  body: {
    height: 80,
    top:"100px;"
  },
  createButton: {
    display: "block",
    margin: "0 auto",
    top:"100px"
  },
});

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const Quotes = (props) => {
  const classes = useStyles();
  const [quotes, setQuotes] = useState([]);
  const [isShowCreatePost, setIsShowCreatePost] = useState(false);

  const toggleCreatePost = () => {
    setIsShowCreatePost(!isShowCreatePost);
  };

  useEffect(() => {
    const getQuotes = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/photos?_limit=18"
      );
      const quotes = res.data;
      setQuotes(quotes);
    };
    getQuotes();
  }, []);

  const acceptNewQuote = (newQuote) => {
    // setQuotes automatically triggers a re-render in React, I have to remember this ,I keep forgetting. DONT BE STUPID!
    setQuotes([...quotes, newQuote]);
  };

  const deleteEntry = async (currentId) => {
    let res = null;
    try {
      res = await axios.delete(
        `https://jsonplaceholder.typicode.com/photos/${currentId}`
      );
      toast.success("Deleted Successfully");
    } catch (error) {
      console.log("error", error);
      toast.error("Deletion Failed");
    }

    // Delete quote from frontend by filtering quotes
    setQuotes(quotes.filter((quote) => quote.id !== currentId));
  };

  return (
    
    <div className="quotesContainer">

<AppBar position="fixed">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    
  
    <Button
            classes={classes.logoutButton}
            size="medium"
            color="primary"
            onClick={props.Logout}
            variant="contained"
            color="primary"
            color="secondary"
          >
            Logout
          </Button>
  </Toolbar>
</AppBar>
      {isShowCreatePost && (
        <div className="createPostContainer">
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={toggleCreatePost}
            className={classes.createButton}
          >
            Show Posts
          </Button>
          <CreatePost
            acceptNewQuote={acceptNewQuote}
            setIsShowCreatePost={setIsShowCreatePost}
          />
        </div>
      )}

      {!isShowCreatePost && (
        <div>
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={toggleCreatePost}
            className={classes.createButton}
          >
            Create Post
          </Button>
          <section className="quoteGrid">
            {quotes.map((quote, index) => (
              <Card className={classes.root} key={quote.id}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={quote.url}
                    title={quote.title}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className={classes.title}
                    >
                      {quote.title}
                    </Typography>
                    <Typography
                      className={classes.body}
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {lorem.generateSentences(2)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    className="deleteBtn"
                    size="small"
                    color="primary"
                    onClick={() => deleteEntry(quote.id)}
                    variant="contained"
                    color="primary"
                    color="secondary"
                    endIcon={<DeleteIcon />}
                  >
                    Delete Entry
                  </Button>
                </CardActions>
              </Card>
              
            ))}
          </section>
          <footer>
      &copy; Copyright 2021 Keagan St. Rose Enterprises
      </footer>
        </div>
      )}
    </div>
  );
};

export default Quotes;
