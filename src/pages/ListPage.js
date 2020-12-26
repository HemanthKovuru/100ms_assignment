import React, { useState, useEffect } from "react";
import ListCard from "../components/ListCard";
import axios from "axios";
import "./../scss/ListPage.scss";
import Pagination from "../components/Pagination";
import { Redirect } from "react-router-dom";
// import { useHistory } from "react-router-dom";
const ListPage = () => {
  // 1]. initialize data
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);

  // 2]. fetch results
  const fetchList = async () => {
    setLoading(true);

    const items = await axios.get(
      `https://www.breakingbadapi.com/api/characters`
    );

    if (
      items.data.length > 0 &&
      items.config.url !== "https://www.breakingbadapi.com/api/characters"
    ) {
      setError(true);
    } else {
      setList(items.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  // 3]. implement search and category functionality

  // 3.1]. search
  let filterItems = [...list];

  if (list && list.length > 0) {
    filterItems = filterItems.filter((item) => {
      let name = item.name.toLowerCase();
      if (name.includes(query)) return item;
    });
  }

  // 3.2]. category
  if (category) {
    filterItems = filterItems.filter((item) => item.category === category);
  }

  // 4]. implement pagination
  const indexOfLastItem = curPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;

  const curList = filterItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (num) => {
    setCurPage(num);
  };

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return (
      <div className='error'>
        Requesting page is not available Please come again after some time or
        refresh the page
      </div>
    );
  }

  return (
    <div className='home'>
      <div className='search-box'>
        <select onChange={(evt) => setCategory(evt.target.value)} id='category'>
          <option value='' selected>
            select by category
          </option>
          <option value='Breaking Bad'>Breaking Bad</option>
          <option value='Better Call Saul'>Better Call Saul</option>
        </select>
        <input
          className='search'
          type='text'
          placeholder='search for your favourite actor'
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
        />
      </div>

      <div className='list-box'>
        {curList.length > 0 &&
          curList.map((item) => <ListCard key={item.char_id} item={item} />)}
      </div>
      <Pagination
        perPage={perPage}
        totalitems={filterItems.length}
        paginate={paginate}
      />
    </div>
  );
};

export default ListPage;
