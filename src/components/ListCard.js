import React from "react";
import { Link } from "react-router-dom";
import "./../scss/ListCard.scss";

const ListCard = ({ item }) => {
  const name = item.name.replace(" ", "+");
  return (
    <Link to={`/characters/${name}/${item.char_id}`}>
      <div className='list-card'>
        <div>Name</div>
        <div>{item.name}</div>
        <div>Birthday</div>
        <div>{item.birthday}</div>
        <div>Occupation</div>
        <div>
          {item.occupation.length > 2 ? (
            <span>{item.occupation[0].slice(0, 22) + "{...}"}</span>
          ) : (
            <span>
              {item.occupation[0].length > 22
                ? item.occupation[0].slice(0, 22) + "{...}"
                : item.occupation[0].slice(0, 22)}
            </span>
          )}
        </div>
        <div>Status</div>
        <div>{item.status}</div>
      </div>
    </Link>
  );
};

export default ListCard;
