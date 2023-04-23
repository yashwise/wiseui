// Import React and useState hook
import React, { useState } from "react";

// Import vCard library
import vCard from 'vcf';

// Define a custom component called Form
function Form() {
  // Define state variables for name, address and company
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");

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
        console.log(result);
      })
      .catch((error) => {
        // Handle any error from the fetch request
        console.error(error);
      });
  };

  // Return the JSX code for rendering the form
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        required
      />
      <label htmlFor="company">Company:</label>
      <input
        type="text"
        id="company"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Export the Form component
export default Form;