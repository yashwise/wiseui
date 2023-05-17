import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Deal = () => {
    const { id } = useParams();
    const url = "http://127.0.0.1:5000";
    const [dealData, setDealData] = React.useState({
        'company_name': '', 'summary': '', 'transcript_list': []
    });

    const [loading, setLoading] = React.useState(true);
    const [isSubmitting, setIsSubmitting] = React.useState(false);


    useEffect(() => {
        const fetchData = async () => {
          let api_url = `${url}/getdeal?deal_name=${id}`;
          const data = await fetch(api_url);
          const json = await data.json();
          console.log(json);
          if (json.deal_data)setDealData(json.deal_data);
          setLoading(false)
        };
        fetchData();
      }, []);
    
    const handleSaveToWise = async(event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
          let api_url = `${url}/savedealsummary`;
          const response = await fetch( api_url, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(dealData)
          });
          console.log(response);
        } catch (error) {
          console.error(error);
        }
        setIsSubmitting(false);
    }

    const getDealSummary = async(event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            let api_url = `${url}/getdealsummary?deal_name=${id}`;
            const data = await fetch(api_url);
            const json = await data.json();
            console.log(json);
            if (json.deal_summary){
                let current_deal_data = dealData;
                current_deal_data.summary = json.deal_summary;
                setDealData(current_deal_data);
            }
        } catch (error) {
            console.error(error);
        }
        setIsSubmitting(false);
    }
    return (
        <div>
            <div>{loading && <p>Loading</p>}</div>
            <h1>{dealData.company_name}</h1>
            <div><h5>Deal Summary:</h5></div>
            <textarea 
                defaultValue={dealData.summary}
                onChange={event => setDealData({...dealData, summary: event.target.value})}
            />
            <button disabled={isSubmitting} onClick={getDealSummary}>Get New Deal Summary</button>
            <button disabled={isSubmitting} onClick={handleSaveToWise}>Save to Wise DB</button>
            <div>
                Calls
                <ul>
                    {dealData.transcript_list.map( (item,index) => (
                        <li key={index}>
                            <Link to={{ pathname: `/transcript/${item}`}}>
                                <h2>{item}</h2>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
};

export default Deal;