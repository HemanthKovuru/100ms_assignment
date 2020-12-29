import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../scss/SingleListPage.scss";
import { Link } from "react-router-dom";

const SingleListPage = (props) => {
  // 1]. initilaize item data
  const [item, setItem] = useState({});
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const base_url = "https://www.breakingbadapi.com/api";

  // 2]. implement fetch functions
  const fetchItem = async () => {
    setLoading(true);
    const item = await axios.get(
      `${base_url}/characters/${props.match.params.id}`
    );

    setItem(item.data[0]);
    setLoading(false);
  };

  const fetchQuotes = async () => {
    const quotes = await axios.get(
      `${base_url}/quote?author=${props.match.params.name}`
    );
    console.log(quotes.data);
    setQuotes(quotes.data);
  };

  // 3]. call use effect with fetch functions
  useEffect(() => {
    fetchItem();
    fetchQuotes();
  }, []);

  if (!item) {
    return <div>Loading</div>;
  }

  const { occupation, appearance } = item;

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='container'>
      <Link className='btn' to='/'>
        &larr; back to home
      </Link>
      <div className='container-item'>
        <img className='img' src={item.img} alt={item.name} />
        <div className='list-card rm-bs'>
          <div>Character Name</div>
          <div>{item.name}</div>
          <div>Birthday</div>
          <div>{item.birthday}</div>
          <div>Occupation</div>
          <div>
            {occupation &&
              occupation.map((occ) => {
                return <div>{occ},</div>;
              })}
          </div>
          <div>Status</div>
          <div>{item.status === "Deceased" ? "Dead" : "Alive"}</div>
          <div>Nickname</div>
          <div>{item.nickname}</div>
          <div>Actor Name</div>
          <div>{item.portrayed}</div>
          <div>Season</div>
          <div>{appearance && appearance.map((i) => <span>{i}, </span>)}</div>
        </div>
      </div>
      {quotes.length > 0 && (
        <div className='quotes'>
          <h2>Quotes</h2>
          {quotes.map((q) => (
            <div className='quote' key={q.quote_id}>
              {q.quote}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleListPage;
