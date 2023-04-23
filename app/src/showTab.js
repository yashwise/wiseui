// Import React and useState hook
import React, { useState } from "react";
import FileUpload from './uploadVCard';
import Form from './enterContactSearch';
import Transcript from './transcript';

// Define a custom component called Tab
function Tab() {
  // Define state variable for the active tab
  const [activeTab, setActiveTab] = useState("vCard");

  // Define a function to handle tab click
  const handleTabClick = (tab) => {
    // Set the active tab to the clicked tab
    setActiveTab(tab);
  };

  // Return the JSX code for rendering the tab
  return (
    <div className="tab-container">
      <div className="tab-buttons">
        <button
          className={activeTab === "vCard" ? "active" : ""}
          onClick={() => handleTabClick("vCard")}
        >
          vCard
        </button>
        <button
          className={activeTab === "fillForm" ? "active" : ""}
          onClick={() => handleTabClick("fillForm")}
        >
          Fill Form
        </button>
        <button
          className={activeTab === "transcriptGet" ? "active" : ""}
          onClick={() => handleTabClick("transcriptGet")}
        >
          Get Transcript Summary
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "vCard" && (
          <FileUpload />
        )}
        {activeTab === "fillForm" && (
          <Form />
        )}
        {activeTab === "transcriptGet" && (
          <Transcript />
        )}
      </div>
    </div>
  );
}

// Export the Tab component
export default Tab;
