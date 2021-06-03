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
  },
  createButton: {
    display: "block",
    margin: "0 auto",
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

const Quotes = () => {
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
        </div>
      )}
    </div>
  );
};

export default Quotes;
