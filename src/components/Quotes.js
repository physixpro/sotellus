import React, { useState, useEffect } from "react";
import PostUser from "../components/PostUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const getQuotes = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
        // "https://jsonplaceholder.typicode.com/photos",{title:"keagan e.g.", url:"https://jw-webmagazine.com/wp-content/uploads/2020/03/Kimetsu-no-YaibaDemon-Slayer.jpg"}
      );
      const quotes = res.data;
      setQuotes(quotes.slice(0, 4));
      console.log(quotes);
    };
    getQuotes();
  }, []);

  useEffect(() => {
    console.log("quotes changed");
  }, [quotes]);

  const acceptNewQuote = (newQuote) => {
    // setQuotes automatically triggers a re-render in React, I have to remember this ,I keep forgetting. DONT BE STUPID!
    setQuotes([...quotes, newQuote]);
  };

 

  const deleteEntry = async (currentId) => {
    let res = null
    try{
       res = await axios.delete(
        `https://jsonplaceholder.typicode.com/photos/${currentId + 1}`

      );   toast.success("Deleted Successfully")
    } catch(error) { 
      console.log("error",error)
      toast.error("Deletion Failed")
    } 
   
  

    console.log("adjafkaa;ej", res);
    // cant just say setQuotes in this case, I need to copy the state, which is the array of elements in order to detect the update/change
    var array = [...quotes]; // make a separate copy of the array
    var index = currentId;
    if (index !== -1) {
      array.splice(index, 1);

      setQuotes(array);
    }
// if (res.status === 200 ){
//   toast.success("Deleted Successfully")
// } else {
//   toast.error("Deletion Failed")
// }
    
  };

  return (
    <div>
      <PostUser acceptNewQuote={acceptNewQuote} />
      <h1 className="quotes">CRUD Testing</h1>
      {quotes.map((quote, index) => (
        <ul key={quote.id + index}>
          <li>{quote.title}</li>
          <li>
            <img src={quote.url} alt="" />
          </li>

          <Button
            onClick={deleteEntry}
            variant="contained"
            color="primary"
            color="secondary"
            endIcon={<DeleteIcon />}
          >
            Delete Entry
          </Button>
        </ul>
      ))}
    </div>
  );
};

export default Quotes;
