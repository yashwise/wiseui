// Import React and other dependencies
import React, { useState } from "react";
import axios from "axios";
import './uploadVCard.css';

// Define a custom component for file upload
function FileUpload() {
  // Use state hooks to store the file and the response
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  // Handle file change event
  const handleFileChange = (e) => {
    // Get the selected file from the input
    const selectedFile = e.target.files[0];
    // Check if the file is a vcf file
    if (selectedFile && selectedFile.type === "text/vcard") {
      // Set the file state
      setFile(selectedFile);
    } else {
      // Reset the file state
      setFile(null);
      // Show an alert
      alert("Please select a valid vcf file");
    }
  };

  // Handle file upload event
  const handleFileUpload = async () => {
    try {
      // Check if the file is selected
      if (file) {
        // Create a form data object
        const formData = new FormData();
        // Append the file to the form data
        formData.append("file", file);
        // Send a post request to the Azure function endpoint with the form data
        const res = await axios.post(
          "https://your-azure-function-url",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Set the response state with the data returned from the Azure function
        setResponse(res.data);
      } else {
        // Show an alert
        alert("Please select a file to upload");
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div className="file-upload">
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {response && (
        <div className="response">
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default FileUpload;