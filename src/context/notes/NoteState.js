import React, { useState } from "react";
import NoteContext from "./noteContext";

//In this file we are creating states which we wanted down the tree in any component without pasing props again and again

const NoteState = (props) => {
  const notesData = [
    {
      _id: "6419921fbbsc1275f68bfb751",
      user: "64198cd38936a0c26f456e05",
      title: "Daily Planet",
      description: "Super-Man- Clark Kent is the Superman",
      tag: "breaking-news",
      date: "2023-03-21T11:16:47.199Z",
      __v: 0,
    },
    {
      _id: "641adb7s190cd98cb29d85d48",
      user: "64198cd38936a0c26f456e05",
      title: "Daily Planet",
      description: "Super-Man- Clark Kent is the Superman",
      tag: "breaking-news",
      date: "2023-03-22T10:41:53.522Z",
      __v: 0,
    },
    {
      _id: "641adb7190csd98cbs29d85d4a",
      user: "64198cd38936a0c26f456e05",
      title: "Daily Planet",
      description: "Super-Man- Clark Kent is the Superman",
      tag: "breaking-news",
      date: "2023-03-22T10:41:53.681Z",
      __v: 0,
    },
    {
      _id: "641asdb7190cd98cb29d85d4c",
      user: "64198cd38936a0c26f456e05",
      title: "Daily Planet",
      description: "Super-Man- Clark Kent is the Superman",
      tag: "breaking-news",
      date: "2023-03-22T10:41:53.847Z",
      __v: 0,
    },
    {
      _id: "641adb719s0cd98cb29d85d4e",
      user: "64198cd38936a0c26f456e05",
      title: "Daily Planet",
      description: "Super-Man- Clark Kent is the Superman",
      tag: "breaking-news",
      date: "2023-03-22T10:41:53.997Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesData)
  return (
    //props.children are wrapped inside & value is passed as above state
    //{<-Javascript {<- object ->} ->}

    //instead of writing like this ->  {{state: state, update: update}}
    <NoteContext.Provider value={{notes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
