import React from "react";
import "./SingleNote.css";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, updateNote } from "../../store/slices/notesSlice";
import { GrEdit } from "react-icons/gr"

function SingleNote(props) {
  const updatedNoteData = useSelector((state) => state.notesReducer.updatedNoteData);
  const dispatch = useDispatch();

  function handleDialog(){
    const thisNote= props.noteText;
    dispatch(updateNote({
      boolValue: true,
      editText: thisNote,
      editId: props.noteId
    }));

    console.log(updatedNoteData);
  }
  
  return (
    <div className="yellow-card">
      <p>{props.noteText}</p>
      <div className="delete-btn-box">
        <p className="date">{props.noteDate}</p>
        <GrEdit className="edit-btn" onClick={handleDialog}/>
        <MdDeleteForever
          className="remove-btn"
          onClick={() => dispatch(deleteNote(props.noteId))}
        />
      </div>
    </div>
  );
}

export default SingleNote;
