import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const SearchHistory = ({ history, onRemove, onSearchLocation}) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleToggleOptions = (index) => {
    if (selectedItemIndex === index) {
      setSelectedItemIndex(null);
    } else {
      setSelectedItemIndex(index);
    }
  };

  const handleSearchLocation = (item)  => {
    onSearchLocation(item);
  };  

 

  return (
    <div className="search-history">
      {history.map((item, index) => (
        <div key={index} className="search-history-item" onClick={() => handleSearchLocation(item)}>
          <span>{item}</span>
          <div className="options">
            {selectedItemIndex === index && (
              <button onClick={() => onRemove(index)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            )}
            <span className="dots" onClick={() => handleToggleOptions(index)}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchHistory;
