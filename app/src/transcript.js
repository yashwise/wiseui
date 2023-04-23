import React, { useEffect } from 'react';

function Transcript() {

  const templist = [];//['testTranscript1.txt', 'testTranscript2.txt'];
  const [blobsList, setblobsList] = React.useState(templist);
  const [summary, setSummary] = React.useState('');
  const [transcript, setTranscript] = React.useState('');
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let url = "https://yashwisetestapp.azurewebsites.net/api/gettranscripts";
      const data = await fetch(url);
      console.log(data);
      const json = await data.json();
      if (json.blobs_list){
        setblobsList(json.blobs_list);
      }
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
      console.log(data);
      const json = await data.json();
      if (json.transcript) setTranscript(json.transcript);
      if (json.summary) setSummary(json.summary);
      setLoading(false)
    } 
  };

  const handleSalesForce = async() => {

  }

  return (
    <div className="Get-Transcript">
      <header className="Transcript-header">
        <div>{loading && <p>Abhi</p>}</div>
        <p>
          Select Transcript to view Summary
        </p>
        <ul>
          {blobsList.map( (item,index) => (
            <li key={index} 
                onClick={() => handleItemClick(index, false)}
                style={{ textDecoration: selectedItemId === index ? 'underline' : 'none' }}
            >
              {item}
            </li>
          ))}
        </ul>
        <div><h5>Transcript:</h5></div>
        <p>{transcript}</p>
        <div><h5>Spiced Transcript:</h5></div>
        <p>{summary}</p>
        <button onClick={() => handleItemClick(selectedItemId, true)}>Regenerate</button>
        <button onClick={() => handleSalesForce()}>Save to Salesforce</button>
      </header>
    </div>
  );
}

export default Transcript;