import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import { Switch } from "antd";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import GreenCard from "./components/GreenCard/GreenCard";
import SearchBar from "./components/SearchBar/SearchBar";
import SingleNote from "./components/SingleNote/SingleNote";
import { setDarkMode } from "./store/slices/notesSlice";
import EditDialog from "./components/EditDialog/EditDialog";

function App() {
  const notes = useSelector((state) => state.notesReducer.allNotes);
  const foundNotes = useSelector((state) => state.notesReducer.filteredNotes);
  const isSearchEmpty = useSelector(
    (state) => state.notesReducer.isSearchEmpty
  );
  const darkMode = useSelector((state) => state.notesReducer.darkMode);
  const dispatch = useDispatch();

  function handleToggle(checked) {
    if (checked) dispatch(setDarkMode(true));
    else dispatch(setDarkMode(false));
  }

  return (
    <div className={darkMode ? "dark-mode" : undefined}>
      <div className="main-container">
        <div className="headingAndToggle">
          <h1>KeepNotes</h1>
          <Switch
            onChange={handleToggle}
            checkedChildren={<MdLightMode />}
            unCheckedChildren={<MdDarkMode />}
          />
        </div>
        <SearchBar />
        <div className="container">
          <GreenCard />
          {foundNotes.length === 0 ? (
            isSearchEmpty ? (
              notes.map((noteObj) => {
                return (
                  <SingleNote
                    key={noteObj.id}
                    noteText={noteObj.text}
                    noteDate={noteObj.date}
                    noteId={noteObj.id}
                  />
                );
              })
            ) : (
              <h2>No notes found!</h2>
            )
          ) : (
            foundNotes.map((noteObj) => {
              return (
                <SingleNote
                  key={noteObj.id}
                  noteText={noteObj.text}
                  noteDate={noteObj.date}
                  noteId={noteObj.id}
                />
              );
            })
          )}
        </div>
           <EditDialog />
              
      </div>
    </div>
  );
}

export default App;
