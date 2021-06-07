import React, { useState, useEffect } from "react";

const StorageTest = () => {
  const [value, setValue] = useState(
    localStorage.getItem("myValueInLocalStorage") || ""
  );

  useEffect(() => {
    localStorage.setItem("myValueInLocalStorage", value);
  }, [value]);

//   const onChange = (event) => setValue(event.target.value);
const recordChange = (e) => {
    setValue(e.target.value)
    console.log(e.target.value)
}

  return <div>

<h1>Hello React with Local Storage!</h1>
 
 <input value={value} type="text" onChange={recordChange} />

 <p>{value}</p>
  </div>;
};

export default StorageTest;
