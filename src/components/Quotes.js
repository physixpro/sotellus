import React, { useState, useEffect } from "react";
import Axios from "axios";
import axios from "axios";

const Quotes = () => {
  useEffect(() => {
    const getQuotes = async () => {
      const res = await axios.get(
        "https://api-football-v1.p.rapidapi.com/v3/odds?fixture=568987&bet=1",
        {
          headers: {
            "x-rapidapi-key":
              "430f51b8f4msh210285560160e40p12232djsncad3f562a3fa",
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            useQueryString: true,
          },
        }
      );
      const quotes = res.data.response;
      setQuotes(quotes);
      console.log(quotes);
    };
    getQuotes();
  }, []);

  const [quotes, setQuotes] = useState([]);

  return (
    <div>
      <h1 className="quotes">
        Good Morning! Here's your dose of daily inspiration.
      </h1>
    </div>
  );
};

export default Quotes;
