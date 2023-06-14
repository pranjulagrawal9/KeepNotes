import {createSlice, nanoid} from '@reduxjs/toolkit'

export const notesSlice= createSlice({

    name: 'notesSlice',
    initialState: {
        allNotes: [],
        filteredNotes: [],
        isSearchEmpty: true,
        darkMode: false,
        showModal: false,
        updatedNoteData: ["", ""]
    },
    reducers: {
        addNote: (state, action)=>{
            const newNote= {
                id: nanoid(),
                text: action.payload,
                date: new Date().toLocaleDateString()
            }

            state.allNotes.push(newNote);
        },

        deleteNote: (state, action)=>{
            const foundNote= state.allNotes.find(item=> item.id===action.payload);
            const index= state.allNotes.indexOf(foundNote);
            state.allNotes.splice(index, 1);

            const foundNoteInSearch= state.filteredNotes.find(item=> item.id===action.payload);
            if(foundNoteInSearch){
                const indexInSearch= state.filteredNotes.indexOf(foundNoteInSearch);
                state.filteredNotes.splice(indexInSearch, 1);
            }    
        },

        filterNote: (state, action)=>{
            if(action.payload===''){
                state.filteredNotes=[];
                state.isSearchEmpty= true;
                return;
            }
            state.filteredNotes= state.allNotes.filter(note=> note.text.toLowerCase().includes(action.payload.toLowerCase()));
            state.isSearchEmpty= false;
        },

        setDarkMode: (state, action)=>{
            state.darkMode= action.payload;
        },

        updateNote: (state, action)=>{
            
            state.updatedNoteData[0]= action.payload.editText;
            state.updatedNoteData[1]= action.payload.editId;
            state.showModal= action.payload.boolValue;
        },

        saveUpdatedNote: (state, action)=>{
            const updatedNote= state.allNotes.find(item=> item.id===state.updatedNoteData[1]);
            const index= state.allNotes.indexOf(updatedNote);
            updatedNote.text= action.payload;
            state.allNotes[index]=updatedNote;
        }
    }
})

export const {addNote, deleteNote, filterNote, setDarkMode, updateNote, saveUpdatedNote}= notesSlice.actions;
export default notesSlice.reducer;