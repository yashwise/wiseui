import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Deals() {

  const [deals, setDeals] = React.useState([{
    'company_name': '', 'id': ''
  }]);
  // const url = "https://yashwisetestapp.azurewebsites.net/api";
  const url = "http://127.0.0.1:5000";

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("here");
      
      let api_url = `${url}/getdeals`;
      const data = await fetch(api_url);
      const json = await data.json();
      console.log(json);
      if (json.deals)setDeals(json.deals);
      setLoading(false)
    };
    fetchData();
  }, []);

return (
    <div>
      <div>{loading && <p>Loading</p>}</div>
      <h1>List of Deals</h1>
      {deals.length > 0 && 
        <ul>
          {deals.map((deal) => (
            <li key={deal.company_name}>
              <Link to={{ pathname: `/deal/${deal.id}`}}>
                <h2>{deal.company_name}</h2>
              </Link>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default Deals;