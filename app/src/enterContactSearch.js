// Import library
import React, { useState } from "react";
import vCard from 'vcf';

import './enterContactSearch.css';

// Define a custom component called Form
function Form() {
  // Define state variables for name, address and company
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [response, setResponse] = useState(null);

  // Define a function to handle form submission
  const handleSubmit = (event) => {
    // Prevent default browser behavior
    event.preventDefault();
    // Create a new vCard object
    const card = new vCard();
    // Set the name, address and company fields of the vCard
    card.add('fn', name);
    card.add('org', company);
    card.add('adr', ['', '', '', address, '', ''], {
        type: 'WORK',
      });
    
    const vcardContent = card.toString();
    // Define the URL of the Azure function
    const url = "https://example.com/api/FunctionName";
    // Define the options for the fetch request
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "text/vcard",
      },
      body: vcardContent,
    };
    // Send the fetch request to the Azure function
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        // Handle the result from the Azure function
        setResponse(result);

      })
      .catch((error) => {
        // Handle any error from the fetch request
        console.error(error);
      });
  };

  // Return the JSX code for rendering the form
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Enter Search Details</h1>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name}
        onChange={(event) => setName(event.target.value)}
        required />
        
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={address}
        onChange={(event) => setAddress(event.target.value)}
        required/>
        
        <label htmlFor="company">Company:</label>
        <input type="text" id="company" value={company}
        onChange={(event) => setCompany(event.target.value)}
        required/>
        
        <button type="submit">Submit</button>
    </form>
    {response && (
      <div>
      <h2>Response</h2>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
      )}
  </div>
  );
}

// Export the Form component
export default Form;