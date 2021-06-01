import React, { useState, useEffect } from "react";
import PostUser from "../components/PostUser";
import axios from "axios";


const Quotes = () => {


  useEffect(() => {
    const getQuotes = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/photos",
        // "https://jsonplaceholder.typicode.com/photos",{title:"keagan e.g.", url:"https://jw-webmagazine.com/wp-content/uploads/2020/03/Kimetsu-no-YaibaDemon-Slayer.jpg"}
       
      );
      const quotes = res.data;
      setQuotes(quotes.slice(0,4));
      console.log(quotes);
    };
    getQuotes();
  }, []);

  const [quotes, setQuotes] = useState([]);

 const acceptNewQuote = (newQuote) => {
   // setQuotes automatically triggers a re-render in React
    setQuotes([...quotes, newQuote])
  }

  return (
    <div>
       <PostUser acceptNewQuote={acceptNewQuote} />
       <h1 className="quotes">
        Good Morning! Here's your daily dose of everything that is football.
      </h1>
      {quotes.map((quote,index)=> (
        <ul key={quote.id+index}>
          <li>{quote.title}</li>
          <li> <img src={quote.url}
           alt="" /></li>
        </ul>
        
      ))}
      
    </div>
  );
};

export default Quotes;
