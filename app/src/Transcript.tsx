import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { useParams, Link } from 'react-router-dom';

function Transcript() {
  const { id } = useParams();
  // const url = "https://yashwisetestapp.azurewebsites.net/api";
  const url = "http://127.0.0.1:5000";

  const tempSummary = {
    'summary': '', 
    'pain': '', 
    'impact': '', 
    'critical_event': '',
    'decision_criteria': '',
    'transcript_name': '',
    // 'transcript_content': ''
  }
  const [spiced, setSpiced] = React.useState(tempSummary);
  const [transcript_content, setTranscript] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
    setLoading(true)
      let api_url = `${url}/transcriptsummary`;
      api_url = `${api_url}?transcript=${id}`;
      // api_url = `${api_url}&regenerate=${regenerate}`;
      api_url = `${api_url}&regenerate=false`;
      const data = await fetch(api_url);
      const json = await data.json();
      console.log(json);
      if (json.transcript_content) setTranscript(json.transcript_content);
      if (json.spiced){
        setSpiced( spiced => ({
          ...spiced, 
          ...json.spiced
        }));
      }
      setLoading(false)
    };
    fetchData();
  }, []);

  const handleSaveToWise = async(event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      let api_url = `${url}/savespiced`;
      const response = await fetch( api_url, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(spiced)
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>{loading && <p>Loading</p>}</div>
        <div><h5>Transcript:</h5></div>
        <textarea defaultValue={transcript_content}/>
        <div><h5>Summary:</h5></div>
        <textarea 
          defaultValue={spiced.summary}
          onChange={event => setSpiced({...spiced, summary: event.target.value})}
        />
        <div><h5>Pain:</h5></div>
        <textarea 
          defaultValue={spiced.pain}
          onChange={event => setSpiced({...spiced, pain: event.target.value})}
        />
        <div><h5>Impact:</h5></div>
        <textarea defaultValue={spiced.impact}
          onChange={event => setSpiced({...spiced, impact: event.target.value})}
        />
        <div><h5>Critical Event:</h5></div>
        <textarea defaultValue={spiced.critical_event}
          onChange={event => setSpiced({...spiced, critical_event: event.target.value})}
        />
        <div><h5>Decision Criteria:</h5></div>
        <textarea defaultValue={spiced.decision_criteria}
          onChange={event => setSpiced({...spiced, decision_criteria: event.target.value})}
        />
        {/* <button onClick={() => handleTranscriptClick(selectedItemId, true)}>Regenerate</button> */}
        <button disabled={isSubmitting} onClick={handleSaveToWise}>Save to Wise DB</button>
      </header>
    </div>
  );
}

export default Transcript;