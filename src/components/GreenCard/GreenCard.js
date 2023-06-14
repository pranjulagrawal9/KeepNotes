import React, { useEffect, useRef, useState } from 'react'
import './GreenCard.css'
import { useDispatch } from 'react-redux'
import { addNote } from '../../store/slices/notesSlice';

function GreenCard() {

    const textRef = useRef(null);
    const btnRef= useRef(null);
    const [remaining, setRemaining] = useState(400);
    const [btnDisable, setBtnDisable] = useState(true);
    const dispatch= useDispatch();

    useEffect(() => {
        btnRef.current.disabled=btnDisable;
    }, [btnDisable])
    

    useEffect(() => {
        if(remaining===400){
          setBtnDisable(true);
        }  
        else{
          setBtnDisable(false);
        }   

    }, [remaining]);
    

    function handleLetters(event){
      const numberOfLetters= event.target.value.length;
      setRemaining(400-numberOfLetters);
    }

    function onSave(){
        dispatch(addNote(textRef.current.value));
        textRef.current.value="";
        setRemaining(400);
    }
    
  return (
    <div className='green-card'>
        <textarea cols="30" rows="10" maxLength="400" placeholder='Type to add a note...' spellCheck="false" ref={textRef} onChange={handleLetters}></textarea>
        <div className="btn-box">
            <p>{remaining} Remaining</p>
            <button ref={btnRef} onClick={onSave}>Save</button>
        </div>
    </div>
  )
}

export default GreenCard;