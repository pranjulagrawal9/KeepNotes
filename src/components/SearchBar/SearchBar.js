import React from "react";
import "./SearchBar.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { filterNote } from "../../store/slices/notesSlice";

function SearchBar() {

   const dispatch= useDispatch();

  return (
    <div className="searchBar-container">
      <BiSearchAlt2 />
      <input type="text" placeholder="type to search..." onChange={(event)=>dispatch(filterNote(event.target.value))} />
    </div>
  );
}

export default SearchBar;
