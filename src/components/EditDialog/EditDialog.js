import "./EditDialog.css";

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUpdatedNote, updateNote } from "../../store/slices/notesSlice";

function EditDialog() {
  const textRef = useRef(null);
  const btnRef = useRef(null);
  const [remaining, setRemaining] = useState(400);
  const [btnDisable, setBtnDisable] = useState(true);
  const dispatch= useDispatch();
  const showModal= useSelector(state=> state.notesReducer.showModal);
  const editData= useSelector(state=> state.notesReducer.updatedNoteData);

  useEffect(() => {
    btnRef.current.disabled = btnDisable;
  }, [btnDisable]);

  useEffect(() => {
    if (remaining === 400) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [remaining]);

  useEffect(() => {
      if(showModal)
        textRef.current.value=editData[0];
      else
        textRef.current.value="";

  }, [showModal])
  

  function handleLetters(event) {
    const numberOfLetters = event.target.value.length;
    setRemaining(400 - numberOfLetters);
  }

  function saveEdit(){
      dispatch(saveUpdatedNote(textRef.current.value));
      dispatch(updateNote({
        boolValue: false,
        editText: "",
        editId: ""
      }));
  }

  return (
    <div className={showModal ? "modal show-modal": "modal"} >
      <div className="edit-dialog">
        <div className="close-btn" onClick={()=> dispatch(updateNote({
          boolValue: false,
          editText: "",
          editId: ""
        }))}>&times; 
        </div>
        <textarea
          cols="50"
          rows="15"
          maxLength="400"
          placeholder="Type to add a note..."
          spellCheck="false"
          ref={textRef}
          onChange={handleLetters}
        ></textarea>
        <div className="dialog-btn-box">
          <p>{remaining} Remaining</p>
          <button ref={btnRef} onClick={saveEdit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditDialog;
