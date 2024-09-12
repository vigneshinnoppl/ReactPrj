import React, { useState } from "react";
import './Content.css';

const Content = () => {
    const [segmentName, setSegmentName] = useState('');
  const [selectedValue, setSelectedValue] = useState("");
  const [exact, setExact] = useState([]);
  const [options, setOptions] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);
  
  const backupOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];
  
  const clickFunction = () => {
    const exacted = options.find((option) => option.value === selectedValue);
    if (exacted) {
      setExact((prevExact) => [...prevExact, exacted]);
      setOptions((prevOptions) =>
        prevOptions.filter((option) => option.value !== selectedValue)
      );
      setSelectedValue("");
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const minusTheValue = (index) => {
    const deletedValue = exact[index];
    setOptions((prevOptions) => [...prevOptions, deletedValue]);
    setExact((prevExact) => prevExact.filter((_, i) => i !== index));
  };

  const changeFunction = (e, index) => {
    const searchValue = e.target.value;
    const newExact = [...exact];
    const newOption = backupOptions.find((option) => option.value === searchValue);
    
    if (newOption) {
      newExact[index] = newOption;

      setExact(newExact);
      setOptions((prevOptions) =>
        prevOptions
          .filter((option) => option.value !== newOption.value)
          .concat(exact[index])
      );
    }
  };

  const submitFunction = async () => {
  
    const schema = exact.map((item) => ({
      [item.value]: item.label,
    }));

    const postdata = {
     
      segment_name: segmentName,
      schema: schema,
    };

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postdata),
      });
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error("Error:", err);
    }
    finally{
        setSegmentName('');
        setExact([]);
        setOptions(backupOptions)
    }
  };

  return (
    <div>
         <h2>Enter the Save segment</h2>
      <input
        type="text"
        placeholder="Enter segment name"
        value={segmentName}
        onChange={e => setSegmentName(e.target.value)}
      />
<p>To save Your Segement</p>
<div className="dropdowns-container" style={{marginTop:'10px'}}>
        {exact.map((dropdown, index) => (
          <div key={dropdown.value} className="dropdown-item" style={{marginBottom:'5px'}}>
            <select
              className="schema-dropdown"
              value={dropdown.value}
              onChange={(e) => changeFunction(e, index)}style={{padding:'3px',marginRight:'5px'}}
            >
              <option value={dropdown.value}>{dropdown.label}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button onClick={() => minusTheValue(index)}>-</button>
          </div>
        ))}
      </div>
      <div  style={{display:'block',marginTop:'10px',marginBottom:'10px'}}>
      <select id="schema-dropdown" value={selectedValue} onChange={handleChange} style={{padding:'3px',marginRight:'5px'}}>
        <option value="" disabled>
          Add schema to segment
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        
      </select>
      <button onClick={clickFunction}>+</button>
      </div>



<div className="savebutton">
<button onClick={submitFunction} >Save Segment</button>
</div>
   
    </div>
  );
};

export default Content;
