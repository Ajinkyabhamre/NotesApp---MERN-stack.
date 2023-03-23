import React, { useState } from "react";
import NoteContext from "./noteContext";

//In this file we are creating states which we wanted down the tree in any component without pasing props again and again

const NoteState = (props) => {
  const host = "http://localhost:3000";
  const [notes, setNotes] = useState([]);

  //Get all notes
  const getNotes = async () => {
    //TODO: API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOThjZDM4OTM2YTBjMjZmNDU2ZTA1In0sImlhdCI6MTY3OTM5NjA4M30.gvzaHI3zTe8nZnvvElkX11HGlNL0ASLQdrW3z682CBg",
      },
    });
    const json = await response.json()
    console.log(json);
    setNotes(json)

  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO: API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOThjZDM4OTM2YTBjMjZmNDU2ZTA1In0sImlhdCI6MTY3OTM5NjA4M30.gvzaHI3zTe8nZnvvElkX11HGlNL0ASLQdrW3z682CBg",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json()
    console.log(json)
    console.log("Adding a new note");
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
    setNotes(notes.concat(note));
  };
  //Delete a note
  const deleteNote = async(id) => {
    //TODO: API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOThjZDM4OTM2YTBjMjZmNDU2ZTA1In0sImlhdCI6MTY3OTM5NjA4M30.gvzaHI3zTe8nZnvvElkX11HGlNL0ASLQdrW3z682CBg",
      },
        });
    const json = response.json()
    console.log(json)
    console.log("Deleting id ", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //TODO: API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOThjZDM4OTM2YTBjMjZmNDU2ZTA1In0sImlhdCI6MTY3OTM5NjA4M30.gvzaHI3zTe8nZnvvElkX11HGlNL0ASLQdrW3z682CBg",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit on client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };

  return (
    //props.children are wrapped inside & value is passed as above state
    //{<-Javascript {<- object ->} ->}

    //instead of writing like this ->  {{state: state, update: update}}
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
