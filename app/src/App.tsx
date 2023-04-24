import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {

  const templist = [];//['testTranscript1.txt', 'testTranscript2.txt'];
  const [blobsList, setblobsList] = React.useState(templist);
  const tempSummary = {
    'summary': '', 
    'pain': '', 
    'impact': '', 
    'criticalEvent': '',
    'decisionCriteria': ''
  }
  const [spiced, setSpiced] = React.useState(tempSummary);
  
  // setSpiced( spiced => ({
  //   ...spiced, 
  //   ...tempSummary
  // }));
  
  const [transcript, setTranscript] = React.useState('');
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  // const [isSubmitting, setIsSubmitting] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let url = "https://yashwisetestapp.azurewebsites.net/api/gettranscripts";
      const data = await fetch(url);
      console.log(data);
      const json = await data.json();
      if (json.blobs_list)setblobsList(json.blobs_list);
      setLoading(false)
    };
    fetchData();
  }, []);

  const handleItemClick = async(itemId, regenerate=false) => {
    if (selectedItemId !== itemId || regenerate) {
      setSelectedItemId(itemId);
      setLoading(true)
      let url = "https://yashwisetestapp.azurewebsites.net/api/httpexample";
      const data = await fetch(`${url}?transcript=${blobsList[itemId]}`);
      const json = await data.json();
      console.log(json);
      if (json.transcript) setTranscript(json.transcript);
      if (json.spiced){
        setSpiced( spiced => ({
          ...spiced, 
          ...json.spiced
        }));
      }
      setLoading(false)
    } 
  };

  // const handleSalesForce = async(event) => {
  //   event.preventDefault();
  //   setIsSubmitting(true);
  //   try {
  //     const url = "https://yashwisetestapp.azurewebsites.net/api/landing";
  //     const response = await fetch( url, {
  //       method: 'POST', 
  //       headers: { 'Content-Type': 'application/json'},
  //       body: JSON.stringify(summary)
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setIsSubmitting(false);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <div>{loading && <p>Loading</p>}</div>
        <p>
          Select Transcript to view Summary
        </p>
        <ul>
          {blobsList.map( (item,index) => (
            <li key={index} 
                onClick={() => handleItemClick(index, false)}
                style={{ textDecoration: selectedItemId === index ? 'underline' : 'none' }}
            >{item}</li>
          ))}
        </ul>
        <div><h5>Transcript:</h5></div>
        <textarea defaultValue={transcript}/>
        <div><h5>Summary:</h5></div>
        <textarea defaultValue={spiced.summary}/>
        <div><h5>Pain:</h5></div>
        <textarea defaultValue={spiced.pain}/>
        <div><h5>Impact:</h5></div>
        <textarea defaultValue={spiced.impact}/>
        <div><h5>Critical Event:</h5></div>
        <textarea defaultValue={spiced.criticalEvent}/>
        <div><h5>Decision Criteria:</h5></div>
        <textarea defaultValue={spiced.decisionCriteria}/>
        <button onClick={() => handleItemClick(selectedItemId, true)}>Regenerate</button>
        {/* <button disabled={isSubmitting} onClick={handleSalesForce}>Save to Salesforce</button> */}
      </header>
    </div>
  );
}

export default App;