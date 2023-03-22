import React, { useState } from "react";
import NoteContext from "./noteContext";

//In this file we are creating states which we wanted down the tree in any component without pasing props again and again

const NoteState = (props) => {


  const [notes, setNotes] = useState([])

  //Add a note
  const addNote = (title, description, tag) => {
    //TODO: API CALL
    console.log("Adding a new note")
    const note = {
      _id: "123213",
      user: "345656",
      title: title,
      description: description,
      tag: tag,
      date: "2023-03-22T10:41:53.997Z",
      __v: 0,
    };
    //concat return an array whereas push updates an array
    setNotes(notes.concat(note))
  
}
  //Delete a note
  const deleteNote = (id) => {
    //TODO: API CALL
    console.log("Deleting id ", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
    const editNote = (id, title, description, tag) => {};


  return (
    //props.children are wrapped inside & value is passed as above state
    //{<-Javascript {<- object ->} ->}

    //instead of writing like this ->  {{state: state, update: update}}
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
